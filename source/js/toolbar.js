var $ = require('jquery');

var diva = require('./diva-global');
var elt = require('./utils/elt');

module.exports = createToolbar;

function createToolbar(viewer)
{
    var settings = viewer.getSettings();

    // FIXME(wabain): Temporarily copied from within Diva
    var elemAttrs = function (ident, base)
    {
        var attrs = {
            id: settings.ID + ident,
            class: 'diva-' + ident
        };

        if (base)
            return $.extend(attrs, base);
        else
            return attrs;
    };

    /** Convenience function to subscribe to a Diva event */
    var subscribe = function (event, callback)
    {
        diva.Events.subscribe(event, callback, settings.ID);
    };

    // Creates a toolbar button
    var createButtonElement = function(name, label, callback)
    {
        var button = elt('button', {
            type: 'button',
            id: settings.ID + name,
            class: 'diva-' + name + ' diva-button',
            title: label
        });

        if (callback)
            button.addEventListener('click', callback, false);

        return button;
    };

    // Higher-level function for creators of zoom and grid controls
    var getResolutionControlCreator = function (config)
    {
        return function ()
        {
            var controls;

            switch (settings[config.controllerSetting])
            {
                case 'slider':
                    controls = config.createSlider();
                    break;

                case 'buttons':
                    controls = config.createButtons();
                    break;

                default:
                    // Don't display anything
                    return null;
            }

            var wrapper = elt('span',
                controls,
                config.createLabel()
            );

            var updateWrapper = function ()
            {
                if (settings.inGrid === config.showInGrid)
                    wrapper.style.display = 'inline';
                else
                    wrapper.style.display = 'none';
            };

            subscribe('ViewDidSwitch', updateWrapper);
            subscribe('ObjectDidLoad', updateWrapper);

            // Set initial value
            updateWrapper();

            return wrapper;
        };
    };

    // Zoom controls
    var createZoomControls = getResolutionControlCreator({
        controllerSetting: 'enableZoomControls',
        showInGrid: false,

        createSlider: function ()
        {
            var elem = createSlider('zoom-slider', {
                step: 0.1,
                value: settings.zoomLevel,
                min: settings.minZoomLevel,
                max: settings.maxZoomLevel
            });
            var $elem = $(elem);

            $elem.on('input', function()
            {
                var floatValue = parseFloat(this.value);
                viewer.setZoomLevel(floatValue);
            });

            $elem.on('change', function ()
            {
                var floatValue = parseFloat(this.value);
                if (floatValue !== settings.zoomLevel)
                    viewer.setZoomLevel(floatValue);
            });

            var updateSlider = function ()
            {
                if (settings.zoomLevel !== $elem.val())
                    $elem.val(settings.zoomLevel);
            };

            subscribe('ZoomLevelDidChange', updateSlider);
            subscribe('ViewerDidLoad', function ()
            {
                elt.setAttributes(elem, {
                    min: settings.minZoomLevel,
                    max: settings.maxZoomLevel
                });

                updateSlider();
            });

            return elem;
        },

        createButtons: function ()
        {
            return elt('span',
                createButtonElement('zoom-out-button', 'Zoom Out', function ()
                {
                    viewer.setZoomLevel(settings.zoomLevel - 1);
                }),
                createButtonElement('zoom-in-button', 'Zoom In', function ()
                {
                    viewer.setZoomLevel(settings.zoomLevel + 1);
                })
            );
        },

        createLabel: function ()
        {
            var elem = createLabel('diva-zoom-label', 'zoom-label', 'Zoom level: ', 'zoom-level', settings.zoomLevel);
            var textSpan = $(elem).find(settings.selector + 'zoom-level')[0];

            var updateText = function ()
            {
                textSpan.textContent = settings.zoomLevel.toFixed(2);
            };

            subscribe('ZoomLevelDidChange', updateText);
            subscribe('ViewerDidLoad', updateText);

            return elem;
        }
    });

    // Grid controls
    var createGridControls = getResolutionControlCreator({
        controllerSetting: 'enableGridControls',
        showInGrid: true,

        createSlider: function ()
        {
            var elem = createSlider('grid-slider', {
                value: settings.pagesPerRow,
                min: settings.minPagesPerRow,
                max: settings.maxPagesPerRow
            });
            var $elem = $(elem);

            $elem.on('input', function()
            {
                var intValue = parseInt(elem.value, 10);
                viewer.setGridPagesPerRow(intValue);
            });

            $elem.on('change', function ()
            {
                var intValue = parseInt(elem.value, 10);
                if (intValue !== settings.pagesPerRow)
                    viewer.setGridPagesPerRow(intValue);
            });

            subscribe('GridRowNumberDidChange', function ()
            {
                // Update the position of the handle within the slider
                if (settings.pagesPerRow !== $elem.val())
                    $elem.val(settings.pagesPerRow);
            });

            return elem;
        },

        createButtons: function ()
        {
            return elt('span',
                createButtonElement('grid-out-button', 'Zoom Out', function ()
                {
                    viewer.setGridPagesPerRow(settings.pagesPerRow - 1);
                }),
                createButtonElement('grid-in-button', 'Zoom In', function ()
                {
                    viewer.setGridPagesPerRow(settings.pagesPerRow + 1);
                })
            );
        },

        createLabel: function ()
        {
            var elem = createLabel('diva-grid-label', 'grid-label', 'Pages per row: ', 'pages-per-row', settings.pagesPerRow);
            var textSpan = $(elem).find(settings.selector + 'pages-per-row')[0];

            subscribe('GridRowNumberDidChange', function ()
            {
                textSpan.textContent = settings.pagesPerRow;
            });

            return elem;
        }
    });

    var createViewMenu = function()
    {
        var viewOptionsList = elt('div', elemAttrs('view-options'));

        var changeViewButton = createButtonElement('view-icon', 'Change view', function ()
        {
            $(viewOptionsList).toggle();
        });

        $(document).mouseup(function (event)
        {
            var container = $(viewOptionsList);

            if (!container.is(event.target) && container.has(event.target).length === 0 && event.target.id !== settings.ID + 'view-icon')
            {
                container.hide();
            }
        });

        var selectView = function (view)
        {
            viewer.changeView(view);

            //hide view menu
            $(viewOptionsList).hide();
        };

        var updateViewMenu = function()
        {
            var viewIconClasses = ' diva-view-icon diva-button';

            // display the icon of the mode we're currently in (?)
            if (settings.inGrid)
            {
                changeViewButton.className = 'diva-grid-icon' + viewIconClasses;
            }
            else if (settings.inBookLayout)
            {
                changeViewButton.className = 'diva-book-icon' + viewIconClasses;
            }
            else
            {
                changeViewButton.className = 'diva-document-icon' + viewIconClasses;
            }

            var viewOptions = document.createDocumentFragment();

            // then display document, book, and grid buttons in that order, excluding the current view
            if (settings.inGrid || settings.inBookLayout)
                viewOptions.appendChild(createButtonElement('document-icon', 'Document View', selectView.bind(null, 'document')));

            if (settings.inGrid || !settings.inBookLayout)
                viewOptions.appendChild(createButtonElement('book-icon', 'Book View', selectView.bind(null, 'book')));

            if (!settings.inGrid)
                viewOptions.appendChild(createButtonElement('grid-icon', 'Grid View', selectView.bind(null, 'grid')));

            // remove old menu
            while (viewOptionsList.firstChild)
            {
                viewOptionsList.removeChild(viewOptionsList.firstChild);
            }

            // insert new menu
            viewOptionsList.appendChild(viewOptions);
        };

        subscribe('ViewDidSwitch', updateViewMenu);
        subscribe('ObjectDidLoad', updateViewMenu);

        return elt('div', elemAttrs('view-menu'),
            changeViewButton,
            viewOptionsList
        );
    };

    var createSlider = function(name, options)
    {
        return elt('input', options, {
            id: settings.ID + name,
            class: 'diva-' + name + ' diva-slider',
            type: 'range'
        });
    };

    var createLabel = function(name, id, label, innerName, innerValue)
    {
        return elt('div', {
                id: settings.ID + id,
                class: name + ' diva-label'
            },
            [
                label,
                elt('span', {
                    id: settings.ID + innerName
                }, innerValue)
            ]);
    };

    var createPageNavigationControls = function ()
    {
        // Go to page form
        var gotoForm = settings.enableGotoPage ? createGotoPageForm() : null;

        return elt('span', elemAttrs('page-nav'),
            createPageLabel(), // 'Page x of y' label
            gotoForm
        );
    };

    var createGotoPageForm = function ()
    {
        var gotoPageInput = elt('input', {
            id: settings.ID + 'goto-page-input',
            class: 'diva-input diva-goto-page-input',
            autocomplete: 'off',
            type: 'text'
        });

        var gotoPageSubmit = elt('input', {
            id: settings.ID + 'goto-page-submit',
            class: 'diva-button diva-button-text',
            type: 'submit',
            value: 'Go'
        });

        var inputSuggestions = elt('div', {
                id: settings.ID + 'input-suggestions',
                class: 'diva-input-suggestions'
            }
        );

        var gotoForm = elt('form', {
                id: settings.ID + 'goto-page',
                class: 'diva-goto-form'
            },
            gotoPageInput,
            gotoPageSubmit,
            inputSuggestions
        );

        $(gotoForm).on('submit', function ()
        {
            var desiredPageLabel = gotoPageInput.value;

            if (settings.onGotoSubmit && typeof settings.onGotoSubmit === "function")
            {
                var pageIndex = settings.onGotoSubmit(desiredPageLabel);
                if (!viewer.gotoPageByIndex(pageIndex))
                    alert("No page could be found with that label or page number");

            }
            else // Default if no function is specified in the settings
            {
                if (!viewer.gotoPageByLabel(desiredPageLabel))
                    alert("No page could be found with that label or page number");
            }

            // Hide the suggestions
            inputSuggestions.style.display = 'none';

            // Prevent the default action of reloading the page
            return false;
        });

        $(gotoPageInput).on('input focus', function ()
        {
            inputSuggestions.innerHTML = ''; // Remove all previous suggestions

            var value = gotoPageInput.value;
            var numSuggestions = 0;
            if (settings.enableGotoSuggestions && value)
            {
                var pages = settings.manifest.pages;
                for (var i = 0, len = pages.length; i < len && numSuggestions < 10; i++)
                {
                    if (pages[i].l.toLowerCase().indexOf(value.toLowerCase()) > -1)
                    {
                        var newInputSuggestion = elt('div', {
                                class: 'diva-input-suggestion'
                            },
                            pages[i].l
                        );

                        inputSuggestions.appendChild(newInputSuggestion);

                        numSuggestions++;
                    }
                }

                // Show label suggestions
                if (numSuggestions > 0)
                    inputSuggestions.style.display = 'block';
            }
            else
                inputSuggestions.style.display = 'none';
        });

        $(gotoPageInput).on('keydown', function (e)
        {
            var el;
            if (e.keyCode === 13) // 'Enter' key
            {
                var active = $('.active', inputSuggestions);
                if (active.length)
                    gotoPageInput.value = active.text();

            }
            if (e.keyCode === 38) // Up arrow key
            {
                el = $('.active', inputSuggestions);
                var prevEl = el.prev();
                if (prevEl.length)
                {
                    el.removeClass('active');
                    prevEl.addClass('active');
                }
                else
                {
                    el.removeClass('active');
                    $('.diva-input-suggestion:last', inputSuggestions).addClass('active');
                }
            }
            else if (e.keyCode === 40) // Down arrow key
            {
                el = $('.active', inputSuggestions);
                var nextEl = el.next();
                if (nextEl.length)
                {
                    el.removeClass('active');
                    nextEl.addClass('active');
                }
                else
                {
                    el.removeClass('active');
                    $('.diva-input-suggestion:first', inputSuggestions).addClass('active');
                }
            }
        });

        $(inputSuggestions).on('mousedown', '.diva-input-suggestion', function()
        {
            gotoPageInput.value = this.textContent;
            inputSuggestions.style.display = 'none';
            $(gotoPageInput).trigger('submit');
        });

        $(gotoPageInput).on('blur', function ()
        {
            // Hide label suggestions
            inputSuggestions.style.display = 'none';
        });

        return gotoForm;
    };

    var createPageLabel = function()
    {
        // Current page
        var currentPage = elt('span', {
            id: settings.ID + 'current-page'
        });

        var updateCurrentPage = function ()
        {
            currentPage.textContent = viewer.getCurrentAliasedPageIndex();
        };

        subscribe('VisiblePageDidChange', updateCurrentPage);
        subscribe('ViewerDidLoad', updateCurrentPage);

        // Number of pages
        var numPages = elt('span', {
            id: settings.ID + 'num-pages'
        });

        var updateNumPages = function ()
        {
            numPages.textContent = settings.numPages;
        };

        subscribe('NumberOfPagesDidChange', updateNumPages);
        subscribe('ObjectDidLoad', updateNumPages);

        return elt('span', {
                class: 'diva-page-label diva-label'
            },
            'Page ', currentPage, ' of ', numPages
        );
    };

    var createToolbarButtonGroup = function ()
    {
        var buttons = [createViewMenu()];

        if (settings.enableLinkIcon)
            buttons.push(createLinkIcon());

        if (settings.enableNonPagedVisibilityIcon)
            buttons.push(createToggleNonPagedButton());

        if (settings.enableFullscreen)
            buttons.push(createFullscreenButton());

        return elt('span', elemAttrs('toolbar-button-group'), buttons);
    };

    var createLinkIcon = function ()
    {
        var elem = createButtonElement('link-icon', 'Link to this page');
        var linkIcon = $(elem);

        linkIcon.on('click', function ()
        {
            $('body').prepend(
                elt('div', {
                    id: settings.ID + 'link-popup',
                    class: 'diva-popup diva-link-popup'
                }, [
                    elt('input', {
                        id: settings.ID + 'link-popup-input',
                        class: 'diva-input',
                        type: 'text',
                        value: viewer.getCurrentURL()
                    })
                ])
            );

            if (settings.inFullscreen)
            {
                $(settings.selector + 'link-popup').addClass('in-fullscreen');
            }
            else
            {
                // Calculate the left and top offsets
                var leftOffset = linkIcon.offset().left - 222 + linkIcon.outerWidth();
                var topOffset = linkIcon.offset().top + linkIcon.outerHeight() - 1;

                $(settings.selector + 'link-popup').css({
                    'top': topOffset + 'px',
                    'left': leftOffset + 'px'
                });
            }

            // Catch onmouseup events outside of this div
            $('body').mouseup(function (event)
            {
                var targetID = event.target.id;

                if (targetID !== settings.ID + 'link-popup' && targetID !== settings.ID + 'link-popup-input')
                    $(settings.selector + 'link-popup').remove();
            });

            // Also delete it upon scroll and page up/down key events
            // FIXME(wabain): This is aggressive
            settings.viewportObject.scroll(function ()
            {
                $(settings.selector + 'link-popup').remove();
            });
            $(settings.selector + 'link-popup input').click(function ()
            {
                $(this).focus().select();
            });

            return false;
        });

        return elem;
    };

    var createFullscreenButton = function ()
    {
        return createButtonElement('fullscreen-icon', 'Toggle fullscreen mode', function ()
        {
            viewer.toggleFullscreenMode();
        });
    };

    var createToggleNonPagedButton = function ()
    {
        var getClassName = function()
        {
            return 'toggle-nonpaged-icon' + (viewer.getSettings().showNonPagedPages ? '-active' : '');
        };

        var toggleNonPagedButton = createButtonElement(getClassName(), 'Toggle visibility of non-paged pages', function()
        {
            viewer.toggleNonPagedPagesVisibility();
            var newClassName = 'diva-' + getClassName();
            this.className = this.className.replace(/diva-toggle-nonpaged-icon(-active)?/, newClassName);
        });

        var updateNonPagedButtonVisibility = function ()
        {
            var pages = settings.manifest.pages;
            for (var i = 0; i < pages.length; i++)
            {
                if (settings.manifest.paged && !pages[i].paged)
                {
                    // Show the button, there is at least one non-paged page
                    toggleNonPagedButton.style.display = 'inline-block';
                    return;
                }
            }

            // No non-paged pages were found, hide the button
            toggleNonPagedButton.style.display = 'none';
        };
        subscribe('ObjectDidLoad', updateNonPagedButtonVisibility);

        return toggleNonPagedButton;
    };

    // Handles all status updating etc (both fullscreen and not)
    var init = function ()
    {
        var leftTools = [createZoomControls(), createGridControls()];
        var rightTools = [createPageNavigationControls(), createToolbarButtonGroup()];

        var tools = elt('div', elemAttrs('tools'),
            elt('div', elemAttrs('tools-left'), leftTools),
            elt('div', elemAttrs('tools-right'), rightTools)
        );

        settings.toolbarParentObject.prepend(tools);

        // Handle entry to and exit from fullscreen mode
        var switchMode = function ()
        {
            var toolsRightElement = document.getElementById(settings.ID + 'tools-right');
            var pageNavElement = document.getElementById(settings.ID + 'page-nav');

            if (!settings.inFullscreen)
            {
                // Leaving fullscreen
                $(tools).removeClass('diva-fullscreen-tools');

                //move ID-page-nav to beginning of tools right
                toolsRightElement.removeChild(pageNavElement);
                toolsRightElement.insertBefore(pageNavElement, toolsRightElement.firstChild);
            }
            else
            {
                // Entering fullscreen
                $(tools).addClass('diva-fullscreen-tools');

                //move ID-page-nav to end of tools right
                toolsRightElement.removeChild(pageNavElement);
                toolsRightElement.appendChild(pageNavElement);
            }
        };

        subscribe('ModeDidSwitch', switchMode);
        subscribe('ViewerDidLoad', switchMode);

        var toolbar = {
            element: tools,
            closePopups: function ()
            {
                $('.diva-popup').css('display', 'none');
            }
        };

        return toolbar;
    };

    return init();
}
