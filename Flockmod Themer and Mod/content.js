(() => {
    /* =========================================================
       WHAT'S NEW  <-- edit this list for every release
       Newest version goes FIRST. The "version" must match the
       "version" in manifest.json. Each note is one bullet point.
       Credit someone with {pink:Name}, {blue:Name}, {teal:Name} or {orange:Name}
       (a glowing colored name).
       spots: where the new things are in the mod menu. People who
       update see a pink dot there (and on that tab) until they've
       opened that tab once. Two kinds:
         "Interface > Chat Notifications"  a whole section (tab > title)
         "#themeModSaveSounds"             one setting (the id of its control)
       People who update see these once in a small pink card the
       next time they open the mod menu (General > What's new
       shows them again anytime).
       ========================================================= */
    const CHANGELOG = [
        {
            version: "1.6.3",
            notes: [
                "Saved themes keep your background images and sounds. Requested by {teal:Mazda}.",
                "Draw with chat closed: new messages pop up beside the canvas, and you can reply right there. Requested by {blue:Anonymous}.",
                "Mutes, kicks, bans and silences stand out, with the mod's name in their rank color.",
                "Chat highlights: lines with your name light up (Interface).",
                "A clock by the flower, with your time on FlockMod and a break reminder.",
                "Safety: Show in list highlights the person's name.",
                "13 new built-in sounds.",
                "Section resets for Animations, Sounds, Safety and Backgrounds.",
                "A pink dot on the flower when an update is out, and pink dots in the menu on what's new.",
                "Report a bug fills in your mod version for you."
            ],
            spots: [
                "Interface > Chat Notifications",
                "Interface > Chat Highlights",
                "Interface > Clock & Time",
                "Colors > Chat Notifications",
                "#themeModSaveImages",
                "#themeModSaveSounds"
            ]
        },
        {
            version: "1.6.2",
            notes: [
                "New Board view in the reference window: see, move and resize all your images at once. Requested by {pink:Leia}.",
                "Backgrounds: add an image around the canvas. Requested by {blue:Thoth}.",
                "New animated styles: Lucky days and Dark maid.",
                "Closing the menu with unsaved changes now asks first.",
                "Reset is now Reset all, and asks before resetting.",
                "The menu reopens where you left off. Ctrl+S applies.",
                "New Lite mode in General for slower computers.",
                "Foldable sections in General, Themes and Sounds.",
                "Undo is easier to find after loading a theme.",
                "Safety: choose how often warnings repeat, and keep warning ongoing trolls."
            ]
        },
        {
            version: "1.6.1",
            notes: [
                "Troll detection adjusts to the board's size (S to XL).",
                "It now also catches fast zig-zags, huge erasers and slow erasing."
            ]
        },
        {
            version: "1.6",
            notes: [
                "Canvas colors: paper, surroundings and a dimmer (Colors > Canvas). Requested by {orange:Smiley}.",
                "New Calm Night preset: soft and migraine friendly.",
                "New styles: Lamb, Cozy café, Celestial, Grin ball, Shoreline and Sharks.",
                "Moth is now a glowing Luna moth.",
                "Redrawn Thorned rose and Leaves.",
                "Decorations grow a little on bigger popups.",
                "Fixed: Celestial and Deep sea no longer flash huge on open.",
                "Fixed: tours open folded sections properly."
            ]
        },
        {
            version: "1.5",
            notes: [
                "Fixed: FlockMod shortcuts (B, E...) work again with a picture in the reference window.",
                "Interface, Safety and Backgrounds now use foldable cards, plus a fold-all button.",
                "Fairer troll detection, with a Sensitivity setting and a Huge text check.",
                "Shorter, simpler descriptions everywhere.",
                "Pick popup and bubble styles from tiles, with filters and a Match switch.",
                "Refreshed Cat, Bunny, Bear, Fox, Strawberry and Dragon styles.",
                "Background images run much lighter now.",
                "Fixed: chat bubble timestamps no longer overlap."
            ]
        },
        {
            version: "1.4",
            notes: [
                "A calmer Colors tab with foldable sections.",
                "Gradients are now a small button next to each color.",
                "A pink note reminds you to apply your changes."
            ]
        },
        {
            version: "1.3",
            notes: [
                "13 new popup decoration styles.",
                "Chat bubbles for your own messages (Interface).",
                "A pink Apply button and sound fixes."
            ]
        },
        {
            version: "1.2",
            notes: [
                "A quick \u24D8 tour on every tab, including the reference window."
            ]
        },
        {
            version: "1.1",
            notes: [
                "Reset buttons for each section.",
                "A quick tour, update checks and a full backup file.",
                "Help links and What's new."
            ]
        }
    ];

    let customizationsEnabled = true;

    const MOD_BUTTON_SELECTOR = ".themeModMenuButton";
    const MOD_DIALOG_SELECTOR = '.dialog[name="themeModMenu"]';

    /* v1.6.2: Lite mode (General). Turns off the heavier extras:
       animations, background images and gradients. Your settings for
       them are kept and come back when Lite mode is turned off. */
    const LITE_LS = "flockmodLiteMode";
    let liteMode = localStorage.getItem(LITE_LS) === "true";
    document.documentElement.classList.toggle("fmLite", liteMode);

            const SIDEBAR_COLOR_SETTINGS = [
        {
            cls: "flockmodSidebarPrimaryActive",
            cssVar: "--flockmod-custom-sidebar-primary",
            toggleId: "themeModSidebarPrimaryEnabled",
            inputId: "themeModUISidebarPrimary",
            lsEnabled: "flockmodCustomSidebarPrimaryEnabled",
            lsColor: "flockmodCustomSidebarPrimaryColor",
            defaultColor: "#1d1e22",
            name: "Primary Sidebar Color",
            description: "Main sidebar background and slider/switch thumbs."
        },
        {
            cls: "flockmodSidebarSecondaryActive",
            cssVar: "--flockmod-custom-sidebar-secondary",
            toggleId: "themeModSidebarSecondaryEnabled",
            inputId: "themeModUISidebarSecondary",
            lsEnabled: "flockmodCustomSidebarSecondaryEnabled",
            lsColor: "flockmodCustomSidebarSecondaryColor",
            defaultColor: "#2f3136",
            name: "Secondary Sidebar Color",
            description: "Boxes inside the sidebar (User list, Layers...)."
        },
        {
            cls: "flockmodSidebarCollapserActive",
            cssVar: "--flockmod-custom-sidebar-collapser",
            toggleId: "themeModSidebarCollapserEnabled",
            inputId: "themeModUISidebarCollapser",
            lsEnabled: "flockmodCustomSidebarCollapserEnabled",
            lsColor: "flockmodCustomSidebarCollapserColor",
            defaultColor: "#3a3c43",
            name: "Collapser Color",
            description: "The grip bars under each sidebar box."
        },
        {
            cls: "flockmodSidebarAccentActive",
            cssVar: "--flockmod-custom-sidebar-accent",
            toggleId: "themeModSidebarAccentEnabled",
            inputId: "themeModUISidebarAccent",
            lsEnabled: "flockmodCustomSidebarAccentEnabled",
            lsColor: "flockmodCustomSidebarAccentColor",
            defaultColor: "#378de4",
            name: "Accent 1",
            description: "Sidebar border, slider fills and ON switches."
        },
        {
            cls: "flockmodSidebarInactiveActive",
            cssVar: "--flockmod-custom-sidebar-inactive",
            toggleId: "themeModSidebarInactiveEnabled",
            inputId: "themeModUISidebarInactive",
            lsEnabled: "flockmodCustomSidebarInactiveEnabled",
            lsColor: "flockmodCustomSidebarInactiveColor",
            defaultColor: "#3a3c43",
            name: "Accent 2",
            description: "Unselected layers, dropdowns, OFF switches and empty sliders."
        },
        {
            cls: "flockmodSidebarIconActive",
            cssVar: "--flockmod-custom-sidebar-icon",
            toggleId: "themeModSidebarIconEnabled",
            inputId: "themeModUISidebarIcon",
            lsEnabled: "flockmodCustomSidebarIconEnabled",
            lsColor: "flockmodCustomSidebarIconColor",
            defaultColor: "#acb3ba",
            name: "Sidebar Icon Color",
            description: "Sidebar icons, arrows and layer buttons."
        }
    ];

    const POPUP_COLOR_SETTINGS = [
        {
            cls: "flockmodPopupBackgroundActive",
            cssVar: "--flockmod-custom-popup-background",
            toggleId: "themeModPopupBackgroundEnabled",
            inputId: "themeModUIPopupBackground",
            lsEnabled: "flockmodCustomPopupBackgroundEnabled",
            lsColor: "flockmodCustomPopupBackgroundColor",
            defaultColor: "#1d1e22",
            name: "Popup Background",
            description: "Popup windows, inactive title bars and menus."
        },
        {
            cls: "flockmodPopupContentActive",
            cssVar: "--flockmod-custom-popup-content",
            toggleId: "themeModPopupContentEnabled",
            inputId: "themeModUIPopupContent",
            lsEnabled: "flockmodCustomPopupContentEnabled",
            lsColor: "flockmodCustomPopupContentColor",
            defaultColor: "#2f3136",
            name: "Popup Content Color",
            description: "The inside of popups and the selected chat channel."
        },
        {
            cls: "flockmodPopupTitleBarActive",
            cssVar: "--flockmod-custom-popup-titlebar",
            toggleId: "themeModPopupTitleBarEnabled",
            inputId: "themeModUIPopupTitleBar",
            lsEnabled: "flockmodCustomPopupTitleBarEnabled",
            lsColor: "flockmodCustomPopupTitleBarColor",
            defaultColor: "#4f4f55",
            name: "Title Bar Color",
            description: "Title bar of the active (focused) popup."
        },
        {
            cls: "flockmodPopupTitleTextActive",
            cssVar: "--flockmod-custom-popup-titletext",
            toggleId: "themeModPopupTitleTextEnabled",
            inputId: "themeModUIPopupTitleText",
            lsEnabled: "flockmodCustomPopupTitleTextEnabled",
            lsColor: "flockmodCustomPopupTitleTextColor",
            defaultColor: "#ffffff",
            name: "Title Bar Text & Icons",
            description: "Popup titles and the help/maximize/close buttons."
        },
        {
            cls: "flockmodPopupBorderActive",
            cssVar: "--flockmod-custom-popup-border",
            toggleId: "themeModPopupBorderEnabled",
            inputId: "themeModUIPopupBorder",
            lsEnabled: "flockmodCustomPopupBorderEnabled",
            lsColor: "flockmodCustomPopupBorderColor",
            defaultColor: "#707379",
            name: "Border Color",
            description: "Popup and menu borders."
        },
        {
            cls: "flockmodPopupFieldActive",
            cssVar: "--flockmod-custom-popup-field",
            toggleId: "themeModPopupFieldEnabled",
            inputId: "themeModUIPopupField",
            lsEnabled: "flockmodCustomPopupFieldEnabled",
            lsColor: "flockmodCustomPopupFieldColor",
            defaultColor: "#43444a",
            name: "Field Color",
            description: "Text boxes, dropdowns and the chat input."
        },
        {
            cls: "flockmodPopupButtonActive",
            cssVar: "--flockmod-custom-popup-button",
            toggleId: "themeModPopupButtonEnabled",
            inputId: "themeModUIPopupButton",
            lsEnabled: "flockmodCustomPopupButtonEnabled",
            lsColor: "flockmodCustomPopupButtonColor",
            defaultColor: "#7c7f87",
            name: "Button Color",
            description: "Popup buttons like Send and New PM."
        },
        {
            cls: "flockmodPopupButtonTextActive",
            cssVar: "--flockmod-custom-popup-buttontext",
            toggleId: "themeModPopupButtonTextEnabled",
            inputId: "themeModUIPopupButtonText",
            lsEnabled: "flockmodCustomPopupButtonTextEnabled",
            lsColor: "flockmodCustomPopupButtonTextColor",
            defaultColor: "#ffffff",
            name: "Button Text & Icons",
            description: "Text and icons on popup buttons."
        }
    ];

    const CHAT_COLOR_SETTINGS = [
        {
            cls: "flockmodChatChannelsActive",
            cssVar: "--flockmod-custom-chat-channels",
            toggleId: "themeModChatChannelsEnabled",
            inputId: "themeModUIChatChannels",
            lsEnabled: "flockmodCustomChatChannelsEnabled",
            lsColor: "flockmodCustomChatChannelsColor",
            defaultColor: "#1d1e22",
            name: "Channel List Color",
            description: "The chat's channel list and the Messenger's contact list."
        },
        {
            cls: "flockmodChatMessageActive",
            cssVar: "--flockmod-custom-chat-message",
            toggleId: "themeModChatMessageEnabled",
            inputId: "themeModUIChatMessage",
            lsEnabled: "flockmodCustomChatMessageEnabled",
            lsColor: "flockmodCustomChatMessageColor",
            defaultColor: "#ffffff",
            name: "Message Text",
            description: "Chat message text. Usernames keep their role colors."
        },
        {
            cls: "flockmodChatEventActive",
            cssVar: "--flockmod-custom-chat-event",
            toggleId: "themeModChatEventEnabled",
            inputId: "themeModUIChatEvent",
            lsEnabled: "flockmodCustomChatEventEnabled",
            lsColor: "flockmodCustomChatEventColor",
            defaultColor: "#808080",
            name: "System Message Text",
            description: "Joins and friend requests. MOTD and GM keep their colors."
        },
        {
            cls: "flockmodChatTimestampActive",
            cssVar: "--flockmod-custom-chat-timestamp",
            toggleId: "themeModChatTimestampEnabled",
            inputId: "themeModUIChatTimestamp",
            lsEnabled: "flockmodCustomChatTimestampEnabled",
            lsColor: "flockmodCustomChatTimestampColor",
            defaultColor: "#808080",
            name: "Timestamp Color",
            description: "The time next to each message."
        }
    ];

    /* v1.6: the drawing canvas. Only what YOU see changes: the paper
       behind the layers (FlockMod's white .boardContainer) and the gray
       area around it. Layers, drawings, blend modes, saved images and
       the color picker are never touched, and nobody else sees it. */
    const CANVAS_COLOR_SETTINGS = [
        {
            cls: "flockmodCanvasPaperActive",
            cssVar: "--flockmod-custom-canvas-paper",
            toggleId: "themeModCanvasPaperEnabled",
            inputId: "themeModUICanvasPaper",
            lsEnabled: "flockmodCustomCanvasPaperEnabled",
            lsColor: "flockmodCustomCanvasPaperColor",
            defaultColor: "#f3ead8",
            name: "Paper Color",
            description: "Replaces the room's paper color (white, gray...) behind the drawing. Only you see it."
        },
        {
            cls: "flockmodCanvasAreaActive",
            cssVar: "--flockmod-custom-canvas-area",
            toggleId: "themeModCanvasAreaEnabled",
            inputId: "themeModUICanvasArea",
            lsEnabled: "flockmodCustomCanvasAreaEnabled",
            lsColor: "flockmodCustomCanvasAreaColor",
            defaultColor: "#3a3b40",
            name: "Area Around Canvas",
            description: "The gray space around the canvas."
        },
        {
            cls: "flockmodCanvasDimActive",
            cssVar: "--flockmod-custom-canvas-dim",
            toggleId: "themeModCanvasDimEnabled",
            inputId: "themeModUICanvasDim",
            lsEnabled: "flockmodCustomCanvasDimEnabled",
            lsColor: "flockmodCustomCanvasDimColor",
            defaultColor: "#1c1612",
            name: "Canvas Dimmer",
            description: "A soft filter over the whole canvas, drawings too. Works in every room."
        }
    ];

    /* Dimmer strength (the slider under Canvas Dimmer) */
    const CANVAS_DIM_STRENGTH_LS = "flockmodCanvasDimStrength";
    const CANVAS_DIM_STRENGTH_DEFAULT = 30;

    function readCanvasDimStrength() {
        const n = Number(localStorage.getItem(CANVAS_DIM_STRENGTH_LS));
        return Number.isInteger(n) && n >= 5 && n <= 90 ? n : CANVAS_DIM_STRENGTH_DEFAULT;
    }

    function applyCanvasDimStrength(value) {
        document.documentElement.style.setProperty("--flockmod-canvas-dim-strength", String(value / 100));
    }

    function applySavedCanvasDim() {
        applyCanvasDimStrength(readCanvasDimStrength());
    }

    function buildCanvasRowsHTML() {
        const [paper, area, dim] = CANVAS_COLOR_SETTINGS;
        return `
    ${buildSidebarColorRowsHTML([paper])}
    <div class="fmCanvasNote">
        <i class="fas fa-heart"></i>
        <span>Heads up: in rooms with an <b>opaque</b> background, the bottom layer covers the paper color. The dimmer below works everywhere.</span>
    </div>
    ${buildSidebarColorRowsHTML([area, dim])}
    <div class="themeModSetting themeModNoDivider">
        <div class="themeModSettingText">
            <div class="themeModSettingName">Dimmer Strength</div>
            <div class="themeModSettingDescription">How strong the dimmer is.</div>
        </div>
        <div class="themeModRangeControl">
            <input type="range" id="themeModCanvasDimStrength" class="themeModRange" min="5" max="90" step="5" value="${CANVAS_DIM_STRENGTH_DEFAULT}" data-default="${CANVAS_DIM_STRENGTH_DEFAULT}">
            <span id="themeModCanvasDimStrengthValue" class="themeModRangeValue">${CANVAS_DIM_STRENGTH_DEFAULT}%</span>
        </div>
    </div>`;
    }

    function setupCanvasDimmer(dialog) {
        const slider = dialog.querySelector("#themeModCanvasDimStrength");
        const label = dialog.querySelector("#themeModCanvasDimStrengthValue");

        if (!slider) {
            return;
        }

        const show = () => {
            label.textContent = `${slider.value}%`;
            applyCanvasDimStrength(Number(slider.value));
        };

        slider.value = String(readCanvasDimStrength());
        show();
        slider.addEventListener("input", show);

        dialog.querySelector(".themeModApplyButton").addEventListener("click", () => {
            localStorage.setItem(CANVAS_DIM_STRENGTH_LS, slider.value);
        });

        dialog.querySelector(".themeModResetButton").addEventListener("click", () => {
            slider.value = String(CANVAS_DIM_STRENGTH_DEFAULT);
            localStorage.setItem(CANVAS_DIM_STRENGTH_LS, slider.value);
            show();
        });

        dialog.querySelector(".closeButton").addEventListener("click", () => {
            slider.value = String(readCanvasDimStrength());
            show();
        });
    }

    /* v1.6.3: chat notification cards (Interface > Chat Notifications).
       OFF = the card follows your theme: popup background, chat text
       and Accent 1 (Simple coloring fills these in too). */
    const CHATNOTIF_COLOR_SETTINGS = [
        {
            cls: "flockmodCnBackgroundActive",
            cssVar: "--flockmod-custom-cn-background",
            toggleId: "themeModCnBackgroundEnabled",
            inputId: "themeModUICnBackground",
            lsEnabled: "flockmodCustomCnBackgroundEnabled",
            lsColor: "flockmodCustomCnBackgroundColor",
            defaultColor: "#1f2226",
            name: "Card Background",
            description: "Behind each message. OFF = matches your popups."
        },
        {
            cls: "flockmodCnTextActive",
            cssVar: "--flockmod-custom-cn-text",
            toggleId: "themeModCnTextEnabled",
            inputId: "themeModUICnText",
            lsEnabled: "flockmodCustomCnTextEnabled",
            lsColor: "flockmodCustomCnTextColor",
            defaultColor: "#dfe3e6",
            name: "Card Text",
            description: "Message text. Names keep their role colors."
        },
        {
            cls: "flockmodCnPublicActive",
            cssVar: "--flockmod-custom-cn-public",
            toggleId: "themeModCnPublicEnabled",
            inputId: "themeModUICnPublic",
            lsEnabled: "flockmodCustomCnPublicEnabled",
            lsColor: "flockmodCustomCnPublicColor",
            defaultColor: "#f48fb1",
            name: "Public Chat Color",
            description: "Public messages and the reply buttons. OFF = your accent."
        },
        {
            cls: "flockmodCnStaffActive",
            cssVar: "--flockmod-custom-cn-staff",
            toggleId: "themeModCnStaffEnabled",
            inputId: "themeModUICnStaff",
            lsEnabled: "flockmodCustomCnStaffEnabled",
            lsColor: "flockmodCustomCnStaffColor",
            defaultColor: "#6fd38a",
            name: "Staff Chat Color",
            description: "Staff chat messages. OFF = green."
        },
        {
            cls: "flockmodCnPmActive",
            cssVar: "--flockmod-custom-cn-pm",
            toggleId: "themeModCnPmEnabled",
            inputId: "themeModUICnPm",
            lsEnabled: "flockmodCustomCnPmEnabled",
            lsColor: "flockmodCustomCnPmColor",
            defaultColor: "#d6b147",
            name: "Private Message Color",
            description: "Private messages. OFF = FlockMod's PM yellow."
        }
    ];

    /* Every toggle+picker color that shares the sidebar-style wiring
       (init / preview / apply / reset / close / load). */
    const TOGGLE_COLOR_SETTINGS = [
        ...SIDEBAR_COLOR_SETTINGS,
        ...POPUP_COLOR_SETTINGS,
        ...CHAT_COLOR_SETTINGS,
        ...CANVAS_COLOR_SETTINGS,
        ...CHATNOTIF_COLOR_SETTINGS
    ];

    function applySidebarColorPreview(setting, enabled, color) {
        document.documentElement.classList.toggle(
            setting.cls,
            enabled
        );

        document.documentElement.style.setProperty(
            setting.cssVar,
            color
        );
    }

    function getSavedSidebarColor(setting) {
        return {
            enabled:
                localStorage.getItem(setting.lsEnabled) === "true",
            color:
                localStorage.getItem(setting.lsColor) || setting.defaultColor
        };
    }

    function applySavedSidebarColors() {
        TOGGLE_COLOR_SETTINGS.forEach((setting) => {
            const saved = getSavedSidebarColor(setting);

            applySidebarColorPreview(
                setting,
                customizationsEnabled ? saved.enabled : false,
                saved.color
            );
        });
    }

    function buildSidebarColorRowsHTML(list = SIDEBAR_COLOR_SETTINGS) {
        return list.map((setting) => `
    <div class="themeModSetting themeModNoDivider">

        <div class="themeModSettingText">
            <div class="themeModSettingName">
                ${setting.name}
            </div>

            <div class="themeModSettingDescription">
                ${setting.description}
            </div>
        </div>

        <label class="themeModToggle" style="margin-right: 10px;">
            <input type="checkbox" id="${setting.toggleId}">
            <span class="themeModToggleTrack">
                <span class="themeModToggleOption themeModToggleOff">OFF</span>
                <span class="themeModToggleOption themeModToggleOn">ON</span>
                <span class="themeModToggleThumb"></span>
            </span>
        </label>

        <input type="color" id="${setting.inputId}" value="${setting.defaultColor}">

    </div>
    ${gradientRowHTML(setting)}
        `).join("");
    }

    const TOPBAR_COLOR_SETTINGS = [
    {
        cls: "flockmodTopBarBackgroundActive",
        cssVar: "--flockmod-custom-topbar-background",
        toggleId: "themeModTopBarBackgroundEnabled",
        inputId: "themeModUITopBarBackground",
        lsEnabled: "flockmodCustomTopBarBackgroundEnabled",
        lsColor: "flockmodCustomTopBarBackgroundColor",
        defaultColor: "#3a3c43",
        name: "Top Bar Color",
        description: "Background of the top bar."
    },
    {
        cls: "flockmodTopBarTextColorActive",
        cssVar: "--flockmod-custom-topbar-text",
        toggleId: "themeModTopBarTextColorEnabled",
        inputId: "themeModUITopBarTextColor",
        lsEnabled: "flockmodCustomTopBarTextColorEnabled",
        lsColor: "flockmodCustomTopBarTextColor",
        defaultColor: "#ffffff",
        name: "Button Text Color",
        description: "Top bar buttons like Chat and Fullscreen."
    },
    {
        cls: "flockmodTopBarHoverActive",
        cssVar: "--flockmod-custom-topbar-hover",
        toggleId: "themeModTopBarHoverEnabled",
        inputId: "themeModUITopBarHover",
        lsEnabled: "flockmodCustomTopBarHoverEnabled",
        lsColor: "flockmodCustomTopBarHoverColor",
        defaultColor: "#2e2f35",
        name: "Button Hover Color",
        description: "Top bar buttons when hovered."
    },
    {
        cls: "flockmodTopBarBrandActive",
        cssVar: "--flockmod-custom-topbar-brand",
        toggleId: "themeModTopBarBrandEnabled",
        inputId: "themeModUITopBarBrand",
        lsEnabled: "flockmodCustomTopBarBrandEnabled",
        lsColor: "flockmodCustomTopBarBrandColor",
        defaultColor: "#ffffff",
        name: "Brand Title Color",
        description: "The FlockMod title in the top bar."
    },
    {
        cls: "flockmodTopBarProgressActive",
        cssVar: "--flockmod-custom-topbar-progress",
        toggleId: "themeModTopBarProgressEnabled",
        inputId: "themeModUITopBarProgress",
        lsEnabled: "flockmodCustomTopBarProgressEnabled",
        lsColor: "flockmodCustomTopBarProgressColor",
        defaultColor: "#378de4",
        name: "Progress Bar Color",
        description: "The loading/progress bar at the top."
    },
    {
        cls: "flockmodTopBarActivityActive",
        cssVar: "--flockmod-custom-topbar-activity",
        toggleId: "themeModTopBarActivityEnabled",
        inputId: "themeModUITopBarActivity",
        lsEnabled: "flockmodCustomTopBarActivityEnabled",
        lsColor: "flockmodCustomTopBarActivityColor",
        defaultColor: "#2e2f35",
        name: "Activity Bar Color",
        description: "The bar showing the latest activity."
    }
];

function applyTopBarColorPreview(setting, enabled, color) {
    document.documentElement.classList.toggle(setting.cls, enabled);
    document.documentElement.style.setProperty(setting.cssVar, color);
}

function getSavedTopBarColor(setting) {
    return {
        enabled: localStorage.getItem(setting.lsEnabled) === "true",
        color: localStorage.getItem(setting.lsColor) || setting.defaultColor
    };
}

function applySavedTopBarColors() {
    BAR_COLOR_SETTINGS.forEach((setting) => {
        const saved = getSavedTopBarColor(setting);
        applyTopBarColorPreview(
            setting,
            customizationsEnabled ? saved.enabled : false,
            saved.color
        );
    });
}

function buildTopBarColorRowsHTML() {
    return TOPBAR_COLOR_SETTINGS.map((setting) => `
    <div class="themeModSetting themeModNoDivider">

        <div class="themeModSettingText">
            <div class="themeModSettingName">
                ${setting.name}
            </div>

            <div class="themeModSettingDescription">
                ${setting.description}
            </div>
        </div>

        <label class="themeModToggle" style="margin-right: 10px;">
            <input type="checkbox" id="${setting.toggleId}">
            <span class="themeModToggleTrack">
                <span class="themeModToggleOption themeModToggleOff">OFF</span>
                <span class="themeModToggleOption themeModToggleOn">ON</span>
                <span class="themeModToggleThumb"></span>
            </span>
        </label>

        <input type="color" id="${setting.inputId}" value="${setting.defaultColor}">

    </div>
    ${gradientRowHTML(setting)}
    `).join("");
}

const BOTTOMBAR_COLOR_SETTINGS = [
    {
        cls: "flockmodBottomBarBackgroundActive",
        cssVar: "--flockmod-custom-bottombar-background",
        toggleId: "themeModBottomBarBackgroundEnabled",
        inputId: "themeModUIBottomBarBackground",
        lsEnabled: "flockmodCustomBottomBarBackgroundEnabled",
        lsColor: "flockmodCustomBottomBarBackgroundColor",
        defaultColor: "#5a5960",
        name: "Bottom Bar Color",
        description: "Background of the bottom bar."
    },
    {
        cls: "flockmodBottomBarTextColorActive",
        cssVar: "--flockmod-custom-bottombar-text",
        toggleId: "themeModBottomBarTextColorEnabled",
        inputId: "themeModUIBottomBarTextColor",
        lsEnabled: "flockmodCustomBottomBarTextColorEnabled",
        lsColor: "flockmodCustomBottomBarTextColor",
        defaultColor: "#b4b6ba",
        name: "Button Text Color",
        description: "Bottom bar buttons, icons and text."
    },
    {
        cls: "flockmodBottomBarHoverActive",
        cssVar: "--flockmod-custom-bottombar-hover",
        toggleId: "themeModBottomBarHoverEnabled",
        inputId: "themeModUIBottomBarHover",
        lsEnabled: "flockmodCustomBottomBarHoverEnabled",
        lsColor: "flockmodCustomBottomBarHoverColor",
        defaultColor: "#4b4a50",
        name: "Button Hover Color",
        description: "Bottom bar buttons when hovered."
    },
    {
        cls: "flockmodBottomBarSelectedActive",
        cssVar: "--flockmod-custom-bottombar-selected",
        toggleId: "themeModBottomBarSelectedEnabled",
        inputId: "themeModUIBottomBarSelected",
        lsEnabled: "flockmodCustomBottomBarSelectedEnabled",
        lsColor: "flockmodCustomBottomBarSelectedColor",
        defaultColor: "#999999",
        name: "Selected Button Color",
        description: "The selected bottom bar button."
    }
];

const BAR_COLOR_SETTINGS = [
    ...TOPBAR_COLOR_SETTINGS,
    ...BOTTOMBAR_COLOR_SETTINGS
];


/* =========================================================
   GRADIENTS (Colors panel, detailed mode)
   A few big background colors can blend into a second color.
   The gradient starts from the setting's own color (through its
   CSS variable), so it follows the color picker live. Anything
   that needs a single color (borders, thumbs, fades) keeps using
   that first color. Gradients are only drawn in detailed mode.
   ========================================================= */

const GRADIENT_KEYS = {
    flockmodSidebarPrimaryActive: "SidebarPrimary",
    flockmodSidebarSecondaryActive: "SidebarSecondary",
    flockmodSidebarAccentActive: "SidebarAccent",
    flockmodTopBarBackgroundActive: "TopBarBackground",
    flockmodBottomBarBackgroundActive: "BottomBarBackground",
    flockmodPopupContentActive: "PopupContent",
    flockmodPopupTitleBarActive: "PopupTitleBar"
};

function getGradientInfo(setting) {
    const key = GRADIENT_KEYS[setting.cls];

    if (!key) {
        return null;
    }

    return {
        key,
        setting,
        cls: `flockmodGrad${key}Active`,
        gradVar: `--flockmod-grad-${key}`,
        lsEnabled: `flockmodCustomGrad${key}Enabled`,
        lsColor: `flockmodCustomGrad${key}Color`,
        lsAngle: `flockmodCustomGrad${key}Angle`,
        toggleId: `themeModGrad${key}Enabled`,
        inputId: `themeModGrad${key}Color`,
        angleId: `themeModGrad${key}Angle`,
        angleValueId: `themeModGrad${key}AngleValue`,
        defaultColor: liftHex(setting.defaultColor, 0.3),
        defaultAngle: 180
    };
}

function getAllGradientInfos() {
    return [...TOGGLE_COLOR_SETTINGS, ...BAR_COLOR_SETTINGS]
        .map(getGradientInfo)
        .filter(Boolean);
}

function angleLabel(angle) {
    return `${angle}°`;
}

function gradientRowHTML(setting) {
    const g = getGradientInfo(setting);

    if (!g) {
        return "";
    }

    return `
    <div class="themeModSetting themeModNoDivider themeModGradientRow">

        <div class="themeModSettingText">
            <div class="themeModSettingName">
                <i class="fas fa-level-up-alt fa-rotate-90"></i> Gradient: blends into
            </div>

            <div class="themeModSettingDescription">
                Blends into a second color. The slider sets the direction.
            </div>
        </div>

        <div class="themeModGradientControls">
            <label class="themeModToggle">
                <input type="checkbox" id="${g.toggleId}">
                <span class="themeModToggleTrack">
                    <span class="themeModToggleOption themeModToggleOff">OFF</span>
                    <span class="themeModToggleOption themeModToggleOn">ON</span>
                    <span class="themeModToggleThumb"></span>
                </span>
            </label>

            <input type="color" id="${g.inputId}" value="${g.defaultColor}">

            <input type="range" id="${g.angleId}" class="themeModRange" min="0" max="360" step="15" value="${g.defaultAngle}">
            <span id="${g.angleValueId}" class="themeModRangeValue">${angleLabel(g.defaultAngle)}</span>
        </div>

    </div>
    `;
}

function getSavedGradient(g) {
    const angle = Number(localStorage.getItem(g.lsAngle));

    return {
        enabled: localStorage.getItem(g.lsEnabled) === "true",
        color: localStorage.getItem(g.lsColor) || g.defaultColor,
        angle: Number.isInteger(angle) && angle >= 0 && angle <= 360 && localStorage.getItem(g.lsAngle) !== null
            ? angle
            : g.defaultAngle
    };
}

/* Only the class and one variable change, so previews stay cheap */
function applyGradientPreview(g, enabled, color, angle) {
    const root = document.documentElement;

    root.classList.toggle(g.cls, Boolean(enabled) && !isSimpleModeSaved() && !liteMode);
    root.style.setProperty(
        g.gradVar,
        `linear-gradient(${angle}deg, var(${g.setting.cssVar}), ${color})`
    );
}

function applySavedGradients() {
    getAllGradientInfos().forEach((g) => {
        const saved = getSavedGradient(g);
        applyGradientPreview(g, customizationsEnabled && saved.enabled, saved.color, saved.angle);
    });
}

function setupGradientControls(dialog) {
    const controls = getAllGradientInfos().map((g) => {
        const toggle = dialog.querySelector(`#${g.toggleId}`);
        const input = dialog.querySelector(`#${g.inputId}`);
        const angle = dialog.querySelector(`#${g.angleId}`);
        const angleValue = dialog.querySelector(`#${g.angleValueId}`);

        if (!toggle || !input || !angle) {
            return null;
        }

        const saved = getSavedGradient(g);
        toggle.checked = saved.enabled;
        input.value = saved.color;
        angle.value = String(saved.angle);
        angleValue.textContent = angleLabel(saved.angle);

        const preview = () => {
            angleValue.textContent = angleLabel(Number(angle.value));
            applyGradientPreview(g, customizationsEnabled && toggle.checked, input.value, Number(angle.value));
        };

        toggle.addEventListener("change", preview);
        input.addEventListener("input", preview);
        angle.addEventListener("input", preview);

        return { g, toggle, input, angle, angleValue, preview };
    }).filter(Boolean);

    /* Simple mode hides gradients; re-check when it's switched */
    const simpleToggle = dialog.querySelector("#themeModSimpleMode");

    if (simpleToggle) {
        simpleToggle.addEventListener("change", () => {
            controls.forEach((c) => c.preview());
        });
    }

    return {
        save() {
            controls.forEach(({ g, toggle, input, angle }) => {
                localStorage.setItem(g.lsEnabled, toggle.checked);
                localStorage.setItem(g.lsColor, input.value);
                localStorage.setItem(g.lsAngle, angle.value);
            });
        },
        reset() {
            controls.forEach(({ g, toggle, input, angle, preview }) => {
                toggle.checked = false;
                input.value = g.defaultColor;
                angle.value = String(g.defaultAngle);
                localStorage.setItem(g.lsEnabled, "false");
                localStorage.setItem(g.lsColor, g.defaultColor);
                localStorage.setItem(g.lsAngle, String(g.defaultAngle));
                preview();
            });
        }
    };
}

function buildBottomBarColorRowsHTML() {
    return BOTTOMBAR_COLOR_SETTINGS.map((setting) => `
    <div class="themeModSetting themeModNoDivider">

        <div class="themeModSettingText">
            <div class="themeModSettingName">
                ${setting.name}
            </div>

            <div class="themeModSettingDescription">
                ${setting.description}
            </div>
        </div>

        <label class="themeModToggle" style="margin-right: 10px;">
            <input type="checkbox" id="${setting.toggleId}">
            <span class="themeModToggleTrack">
                <span class="themeModToggleOption themeModToggleOff">OFF</span>
                <span class="themeModToggleOption themeModToggleOn">ON</span>
                <span class="themeModToggleThumb"></span>
            </span>
        </label>

        <input type="color" id="${setting.inputId}" value="${setting.defaultColor}">

    </div>
    ${gradientRowHTML(setting)}
    `).join("");
}

/* =========================================================
   SIMPLE COLORING
   A handful of main colors that fill in the detailed ones.
   Saved separately from the detailed settings, so switching
   modes never erases a detailed theme.
   ========================================================= */

const SIMPLE_MODE_LS = "flockmodSimpleColoringEnabled";

const SIMPLE_COLOR_SETTINGS = [
    {
        key: "background",
        toggleId: "themeModSimpleBackgroundEnabled",
        inputId: "themeModUISimpleBackground",
        lsEnabled: "flockmodSimpleBackgroundEnabled",
        lsColor: "flockmodSimpleBackgroundColor",
        defaultColor: "#1d1e22",
        name: "Background",
        description: "The sidebar, bars, popups and menus."
    },
    {
        key: "surface",
        toggleId: "themeModSimpleSurfaceEnabled",
        inputId: "themeModUISimpleSurface",
        lsEnabled: "flockmodSimpleSurfaceEnabled",
        lsColor: "flockmodSimpleSurfaceColor",
        defaultColor: "#2f3136",
        name: "Surface",
        description: "Boxes, layers, dropdowns, popup insides and buttons."
    },
    {
        key: "accent",
        toggleId: "themeModSimpleAccentEnabled",
        inputId: "themeModUISimpleAccent",
        lsEnabled: "flockmodSimpleAccentEnabled",
        lsColor: "flockmodSimpleAccentColor",
        defaultColor: "#378de4",
        name: "Accent",
        description: "Selected things, sliders and switches. Hover is made from it."
    },
    {
        key: "text",
        toggleId: "themeModSimpleTextEnabled",
        inputId: "themeModUISimpleText",
        lsEnabled: "flockmodSimpleTextEnabled",
        lsColor: "flockmodSimpleTextColor",
        defaultColor: "#ffffff",
        name: "Text",
        description: "Headings, buttons and chat text. Small text uses a softer version."
    },
    {
        key: "icons",
        toggleId: "themeModSimpleIconsEnabled",
        inputId: "themeModUISimpleIcons",
        lsEnabled: "flockmodSimpleIconsEnabled",
        lsColor: "flockmodSimpleIconsColor",
        defaultColor: "#acb3ba",
        name: "Icons",
        description: "Sidebar and tool icons."
    }
];

function isSimpleModeSaved() {
    return localStorage.getItem(SIMPLE_MODE_LS) === "true";
}

function getSavedSimpleValues() {
    const values = {};

    SIMPLE_COLOR_SETTINGS.forEach((setting) => {
        values[setting.key] = {
            enabled: localStorage.getItem(setting.lsEnabled) === "true",
            color: localStorage.getItem(setting.lsColor) || setting.defaultColor
        };
    });

    return values;
}

/* Small color helpers used to make the "derived" shades */

function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(rgb) {
    return "#" + rgb
        .map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0"))
        .join("");
}

function mixHex(a, b, amount) {
    const A = hexToRgb(a);
    const B = hexToRgb(b);
    return rgbToHex(A.map((v, i) => v + (B[i] - v) * amount));
}

function isDarkHex(hex) {
    const [r, g, b] = hexToRgb(hex);
    return (0.299 * r + 0.587 * g + 0.114 * b) < 140;
}

/* Nudges a color away from itself: lighter on dark colors,
   darker on light colors — so it works for light themes too. */
function liftHex(hex, amount) {
    return mixHex(hex, isDarkHex(hex) ? "#ffffff" : "#000000", amount);
}

function setColorTarget(cls, cssVar, enabled, color) {
    document.documentElement.classList.toggle(cls, enabled);
    document.documentElement.style.setProperty(cssVar, color);
}

/* sink: optional (cls, cssVar, enabled, color) callback. Without it
   the colors are applied to the page; with it they are only reported
   (used by "Copy to detailed"). */
function applySimpleColors(values, sink) {
    const set = sink || setColorTarget;
    const bg = values.background;
    const sf = values.surface;
    const ac = values.accent;
    const tx = values.text;
    const ic = values.icons;

    const bgColor = bg.enabled ? bg.color : "#1d1e22";
    const surfaceColor = sf.enabled ? sf.color : "#2f3136";

    /* Background */
    set("flockmodSidebarPrimaryActive", "--flockmod-custom-sidebar-primary", bg.enabled, bg.color);
    set("flockmodTopBarBackgroundActive", "--flockmod-custom-topbar-background", bg.enabled, bg.color);
    set("flockmodBottomBarBackgroundActive", "--flockmod-custom-bottombar-background", bg.enabled, bg.color);

    /* Surface */
    set("flockmodSidebarSecondaryActive", "--flockmod-custom-sidebar-secondary", sf.enabled, sf.color);
    set("flockmodSidebarInactiveActive", "--flockmod-custom-sidebar-inactive", sf.enabled, liftHex(surfaceColor, 0.08));
    set("flockmodSidebarCollapserActive", "--flockmod-custom-sidebar-collapser", sf.enabled, liftHex(surfaceColor, 0.15));
    set("flockmodTopBarHoverActive", "--flockmod-custom-topbar-hover", sf.enabled, sf.color);
    set("flockmodBottomBarHoverActive", "--flockmod-custom-bottombar-hover", sf.enabled, sf.color);
    set("flockmodTopBarActivityActive", "--flockmod-custom-topbar-activity", sf.enabled, sf.color);

    /* Accent (+ hover made from it) */
    set("flockmodSidebarAccentActive", "--flockmod-custom-sidebar-accent", ac.enabled, ac.color);
    set("flockmodTopBarProgressActive", "--flockmod-custom-topbar-progress", ac.enabled, ac.color);
    set("flockmodBottomBarSelectedActive", "--flockmod-custom-bottombar-selected", ac.enabled, ac.color);

    /* Accent OFF in simple mode = native selected/hover states */
    set("flockmodSelectedColorActive", "--flockmod-custom-selected", ac.enabled, ac.enabled ? ac.color : "#4f5156");
    set("flockmodHoverColorActive", "--flockmod-custom-hover", ac.enabled, ac.enabled ? mixHex(ac.color, surfaceColor, 0.6) : "#4f5156");

    /* Text (small text = a softer version) */
    const softText = mixHex(tx.color, bgColor, 0.25);

    set("flockmodText1ColorActive", "--flockmod-custom-text1", tx.enabled, tx.color);
    set("flockmodText2ColorActive", "--flockmod-custom-text2", tx.enabled, softText);
    set("flockmodTopBarTextColorActive", "--flockmod-custom-topbar-text", tx.enabled, tx.color);
    set("flockmodTopBarBrandActive", "--flockmod-custom-topbar-brand", tx.enabled, tx.color);
    set("flockmodBottomBarTextColorActive", "--flockmod-custom-bottombar-text", tx.enabled, softText);

    /* Popups & Menus */
    set("flockmodPopupBackgroundActive", "--flockmod-custom-popup-background", bg.enabled, bg.color);
    set("flockmodPopupContentActive", "--flockmod-custom-popup-content", sf.enabled, sf.color);
    set("flockmodPopupTitleBarActive", "--flockmod-custom-popup-titlebar", sf.enabled, liftHex(surfaceColor, 0.15));
    set("flockmodPopupBorderActive", "--flockmod-custom-popup-border", sf.enabled, liftHex(surfaceColor, 0.3));
    set("flockmodPopupFieldActive", "--flockmod-custom-popup-field", sf.enabled, liftHex(surfaceColor, 0.08));
    set("flockmodPopupButtonActive", "--flockmod-custom-popup-button", sf.enabled, liftHex(surfaceColor, 0.25));
    set("flockmodPopupTitleTextActive", "--flockmod-custom-popup-titletext", tx.enabled, tx.color);
    set("flockmodPopupButtonTextActive", "--flockmod-custom-popup-buttontext", tx.enabled, tx.color);

    /* Chat (usernames are never touched) */
    set("flockmodChatChannelsActive", "--flockmod-custom-chat-channels", bg.enabled, bg.color);
    set("flockmodChatMessageActive", "--flockmod-custom-chat-message", tx.enabled, tx.color);
    set("flockmodChatEventActive", "--flockmod-custom-chat-event", tx.enabled, mixHex(tx.color, bgColor, 0.5));
    set("flockmodChatTimestampActive", "--flockmod-custom-chat-timestamp", tx.enabled, mixHex(tx.color, bgColor, 0.45));

    /* Chat notification cards (Staff / PM keep their own colors) */
    set("flockmodCnBackgroundActive", "--flockmod-custom-cn-background", bg.enabled, bg.color);
    set("flockmodCnTextActive", "--flockmod-custom-cn-text", tx.enabled, tx.color);
    set("flockmodCnPublicActive", "--flockmod-custom-cn-public", ac.enabled, ac.color);

    /* Icons */
    set("flockmodSidebarIconActive", "--flockmod-custom-sidebar-icon", ic.enabled, ic.color);
}

function applySavedSimpleColorsIfActive() {
    if (customizationsEnabled && isSimpleModeSaved()) {
        applySimpleColors(getSavedSimpleValues());
    }
}

function buildSimpleColorRowsHTML() {
    return SIMPLE_COLOR_SETTINGS.map((setting) => `
    <div class="themeModSetting themeModNoDivider">

        <div class="themeModSettingText">
            <div class="themeModSettingName">
                ${setting.name}
            </div>

            <div class="themeModSettingDescription">
                ${setting.description}
            </div>
        </div>

        <label class="themeModToggle" style="margin-right: 10px;">
            <input type="checkbox" id="${setting.toggleId}">
            <span class="themeModToggleTrack">
                <span class="themeModToggleOption themeModToggleOff">OFF</span>
                <span class="themeModToggleOption themeModToggleOn">ON</span>
                <span class="themeModToggleThumb"></span>
            </span>
        </label>

        <input type="color" id="${setting.inputId}" value="${setting.defaultColor}">

    </div>
    ${gradientRowHTML(setting)}
    `).join("");
}

    /* Each Interface setting only takes over FlockMod's own sizes
       while it's moved off its default (100% / Regular / 5px). */
    function setInterfaceActive(cls, active) {
        document.documentElement.classList.toggle(cls, Boolean(active));
    }

    function applyFontSizePreview(size) {
        const numericSize = Number(size);

        setInterfaceActive("flockmodFontSizeActive", Number.isFinite(numericSize) && numericSize !== 100);

        if (
            Number.isFinite(numericSize) &&
            numericSize >= 90 &&
            numericSize <= 110
        ) {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font-size",
                String(numericSize / 100)
            );
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font-size"
            );
        }
    }

    function applyFontWeightPreview(weight) {
        setInterfaceActive("flockmodFontWeightActive", ["medium", "semibold", "bold"].includes(weight));

        if (weight === "medium") {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font-weight",
                "500"
            );
        } else if (weight === "semibold") {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font-weight",
                "600"
            );
        } else if (weight === "bold") {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font-weight",
                "700"
            );
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font-weight"
            );
        }
    }

    function applySpacingPreview(spacing) {
        const numericSpacing = Number(spacing);

        setInterfaceActive("flockmodSpacingActive", Number.isFinite(numericSpacing) && numericSpacing !== 100);

        if (
            Number.isFinite(numericSpacing) &&
            numericSpacing >= 75 &&
            numericSpacing <= 125
        ) {
            document.documentElement.style.setProperty(
                "--flockmod-ui-spacing",
                String(numericSpacing / 100)
            );
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-ui-spacing"
            );
        }
    }

    function radiusLabel(radius) {
        return Number(radius) === 5 ? "Default" : `${radius}px`;
    }

    function applyRadiusPreview(radius) {
    const numericRadius = Number(radius);

        setInterfaceActive("flockmodRadiusActive", Number.isFinite(numericRadius) && numericRadius !== 5);

        if (
         Number.isFinite(numericRadius) &&
         numericRadius >= 0 &&
         numericRadius <= 12
        ) {
            document.documentElement.style.setProperty(
             "--flockmod-ui-radius",
             `${numericRadius}px`
            );
        } else {
            document.documentElement.style.removeProperty(
             "--flockmod-ui-radius"
            );
        }
    }

    /* Selected / Hover were always on before they had toggles,
       so "never saved" counts as ON to keep existing setups the same. */
    function isSavedOnByDefault(key) {
        const value = localStorage.getItem(key);
        return value === null ? true : value === "true";
    }

    function applySelectedEnabledPreview(enabled) {
        document.documentElement.classList.toggle("flockmodSelectedColorActive", enabled);
    }

    function applyHoverEnabledPreview(enabled) {
        document.documentElement.classList.toggle("flockmodHoverColorActive", enabled);
    }

    function applySelectedColorPreview(color) {
        document.documentElement.style.setProperty(
            "--flockmod-custom-selected",
            color
        );
    }

    function applyHoverColorPreview(color) {
        document.documentElement.style.setProperty(
            "--flockmod-custom-hover",
            color
        );
    }

    function applyText1ColorEnabledPreview(enabled) {
        document.documentElement.classList.toggle(
            "flockmodText1ColorActive",
            enabled
        );
    }

    function applyText1ColorPreview(color) {
        document.documentElement.style.setProperty(
            "--flockmod-custom-text1",
            color
        );
    }

    function applyText2ColorEnabledPreview(enabled) {
        document.documentElement.classList.toggle(
            "flockmodText2ColorActive",
            enabled
        );
    }

    function applyText2ColorPreview(color) {
        document.documentElement.style.setProperty(
            "--flockmod-custom-text2",
            color
        );
    }


    /* =========================================================
       CUSTOM FONTS
       ---------------------------------------------------------
       Font values (saved as flockmodCustomUIFont and in theme codes):
         "default"             FlockMod's own font
         "Arial" / "Georgia"…  built-in system fonts
         "google:Name"         a Google Fonts family, fetched by name
         "upload:Name"         a font file the user uploaded
       Fonts are always loaded as raw bytes -> FontFace, not with a
       <link>/url(), so FlockMod's security rules can't block them.
       Uploaded files live in this site's IndexedDB (no extension
       permission needed). The list of added fonts is in
       localStorage (flockmodFontLibrary).
       ========================================================= */

    /* =========================================================
       BACKGROUND IMAGES (Backgrounds tab)
       ---------------------------------------------------------
       Images are stored in this site's IndexedDB (like uploaded
       fonts) and never leave the browser. The look settings
       (fit, shade, dim, blur, see-through) are normal settings,
       so they are included in theme codes; the image is not.

       See-through sections: FlockMod's panel colors are hardcoded
       per theme, so we read each panel's current color
       (refreshSeeThrough) into --fmst-* variables, and the CSS
       mixes that color with transparency.
       ========================================================= */

    const BG_DB_NAME = "flockmodThemeModImages";
    const BG_DB_STORE = "images";
    const MAX_BG_UPLOAD_BYTES = 25 * 1024 * 1024;
    const MAX_GIF_BYTES = 8 * 1024 * 1024;
    const BG_MAX_SIDE = 1920;

    const BACKGROUND_PLACES = [
        {
            key: "sidebar",
            label: "Sidebar",
            ls: "flockmodBgSidebar",
            idPart: "Sidebar",
            cls: "flockmodBgSidebarActive",
            seeCls: "flockmodBgSidebarSeeThroughActive",
            cssVar: "--flockmod-bg-sidebar",
            host: "#sidebar",
            imageText: "Shown behind the whole sidebar.",
            seeText: "Lets the image show through the sidebar boxes.",
            /* id, how to find one to read its color */
            see: [
                { id: "sbContent", detect: "#sidebar .boxBgContainer .containerContent" },
                { id: "sbFooter", detect: "#sidebar .containerSidebar .containerFooter" },
                { id: "sbLayers", detect: "#sidebar .os-content:has(> #previewList)" },
                { id: "sbNav", detect: "#sidebar .sidebarNavbar" },
                { id: "sbTools", detect: ".toolbar:has(> #drawingTools)" },
                { id: "sbLayerRow", detect: "#sidebar .layerPreview:not(.selectedLayer):not(:hover)" },
                { id: "sbRowOdd", detect: "#sidebar :is(tr.someoneelse, tr.myself):nth-child(odd):not(.selected):not(:hover)" },
                { id: "sbRowOddTd", detect: "#sidebar :is(tr.someoneelse, tr.myself):nth-child(odd):not(.selected):not(:hover) > td" },
                { id: "sbRowEven", detect: "#sidebar :is(tr.someoneelse, tr.myself):nth-child(even):not(.selected):not(:hover)" },
                { id: "sbRowEvenTd", detect: "#sidebar :is(tr.someoneelse, tr.myself):nth-child(even):not(.selected):not(:hover) > td" }
            ]
        },
        {
            key: "chat",
            label: "Chat",
            ls: "flockmodBgChat",
            idPart: "Chat",
            cls: "flockmodBgChatActive",
            seeCls: "flockmodBgChatSeeThroughActive",
            cssVar: "--flockmod-bg-chat",
            host: '.dialog[name="chat"] .modal-body',
            imageText: "Shown behind the chat window (messages and channel list).",
            seeText: "Lets the image show through the main message area.",
            sideName: "Channel List",
            sideText: "Lets the image show through the channel list on the left.",
            see: [
                { id: "chContent", detect: '.dialog[name="chat"] .dynamicDialogArea' },
                { id: "chChannels", detect: '.dialog[name="chat"] .sidebar' },
                { id: "chBar", detect: '.dialog[name="chat"] .chatBar' }
            ]
        },
        {
            key: "messenger",
            label: "Messenger",
            ls: "flockmodBgMessenger",
            idPart: "Messenger",
            cls: "flockmodBgMessengerActive",
            seeCls: "flockmodBgMessengerSeeThroughActive",
            cssVar: "--flockmod-bg-messenger",
            host: '.dialog[name="messenger"] .modal-body',
            imageText: "Shown behind the Messenger window (conversation and contact list).",
            seeText: "Lets the image show through the conversation area.",
            sideName: "Contact List",
            sideText: "Lets the image show through the contact list on the left.",
            see: [
                { id: "msContent", detect: '.dialog[name="messenger"] .dynamicDialogArea' },
                { id: "msSide", detect: '.dialog[name="messenger"] .sidebar' },
                { id: "msBar", detect: '.dialog[name="messenger"] .messengerSideBar' },
                { id: "msUser", detect: '.dialog[name="messenger"] .messengerUser:not(.selected):not(:hover)' }
            ]
        },
        /* v1.6.2: the gray area around the board (#DrawingArea). The board
           (paper + layers) sits on top, so drawings are never touched.
           noLayer: always the plain background rule, so the drawing area's
           positioning is never changed. */
        {
            key: "canvas",
            label: "Around Canvas",
            ls: "flockmodBgCanvas",
            idPart: "Canvas",
            cls: "flockmodBgCanvasActive",
            seeCls: "flockmodBgCanvasSeeThroughActive",
            cssVar: "--flockmod-bg-canvas",
            host: "#DrawingArea",
            noLayer: true,
            imageText: "Shown in the area around the canvas. The canvas and your drawing stay as they are.",
            see: []
        }
    ];

    /* Settings per place (key suffix, type, default, extra) */
    const BG_FIELD_DEFS = [
        ["Enabled", "bool", false],
        ["Fit", "enum", "cover", { choices: ["cover", "contain", "tile"] }],
        ["Shade", "enum", "dark", { choices: ["dark", "light"] }],
        ["Dim", "int", 30, { min: 0, max: 90 }],
        ["Blur", "int", 0, { min: 0, max: 20 }],
        ["SeeThrough", "int", 0, { min: 0, max: 100, not: ["canvas"] }],
        /* Chat only: the channel list gets its own see-through */
        ["ChannelSeeThrough", "int", 0, { min: 0, max: 100, only: ["chat", "messenger"] }]
    ];

    function bgFieldsFor(place) {
        return BG_FIELD_DEFS.filter(([, , , extra]) => !extra ||
            ((!extra.only || extra.only.includes(place.key)) && (!extra.not || !extra.not.includes(place.key))));
    }

    function bgLsKey(place, suffix) {
        return place.ls + suffix;
    }

    function readBgSettings(place) {
        const out = {};

        bgFieldsFor(place).forEach(([suffix, type, def, extra]) => {
            const raw = localStorage.getItem(bgLsKey(place, suffix));
            let value = def;

            if (raw !== null) {
                if (type === "bool") {
                    value = raw === "true";
                } else if (type === "int") {
                    const n = Number(raw);
                    value = Number.isInteger(n) && n >= extra.min && n <= extra.max ? n : def;
                } else {
                    value = extra.choices.includes(raw) ? raw : def;
                }
            }

            out[suffix] = value;
        });

        return out;
    }

    /* ---- IndexedDB ---- */

    function openBgDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(BG_DB_NAME, 1);
            request.onupgradeneeded = () => request.result.createObjectStore(BG_DB_STORE);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function bgDB(mode, action) {
        const db = await openBgDB();

        return new Promise((resolve, reject) => {
            const tx = db.transaction(BG_DB_STORE, mode);
            const request = action(tx.objectStore(BG_DB_STORE));
            tx.oncomplete = () => { db.close(); resolve(request && request.result); };
            tx.onerror = () => { db.close(); reject(tx.error); };
        });
    }

    /* In-memory copy so sliders don't hit the database every tick */
    const bgBlobCache = new Map();   /* key -> Blob | null */
    const bgDisplay = new Map();     /* key -> { cacheKey, url } */
    const bgApplyToken = new Map();

    async function getBgBlob(key) {
        if (!bgBlobCache.has(key)) {
            try {
                bgBlobCache.set(key, (await bgDB("readonly", (s) => s.get(key))) || null);
            } catch (error) {
                bgBlobCache.set(key, null);
            }
        }

        return bgBlobCache.get(key);
    }

    async function setBgBlob(key, blob) {
        await bgDB("readwrite", (s) => (blob ? s.put(blob, key) : s.delete(key)));
        bgBlobCache.set(key, blob || null);
        forgetBgDisplay(key);
    }

    function forgetBgDisplay(key) {
        const shown = bgDisplay.get(key);

        if (shown && shown.url.startsWith("blob:")) {
            URL.revokeObjectURL(shown.url);
        }

        bgDisplay.delete(key);
    }

    function canvasToBlob(canvas, type, quality) {
        return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
    }

    /* Shrinks big uploads so they stay fast and small. GIFs are kept
       as-is so they keep animating. */
    async function prepareBgImage(file) {
        if (!/^image\//.test(file.type)) {
            throw new Error("That file isn't an image.");
        }

        if (file.type === "image/gif") {
            if (file.size > MAX_GIF_BYTES) {
                throw new Error("That GIF is too big (8 MB max).");
            }
            return file;
        }

        if (file.size > MAX_BG_UPLOAD_BYTES) {
            throw new Error("That image is too big (25 MB max).");
        }

        let bitmap;

        try {
            bitmap = await createImageBitmap(file);
        } catch (error) {
            throw new Error("That image couldn't be read.");
        }

        const scale = Math.min(1, BG_MAX_SIDE / Math.max(bitmap.width, bitmap.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(bitmap.width * scale));
        canvas.height = Math.max(1, Math.round(bitmap.height * scale));
        canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();

        return (await canvasToBlob(canvas, "image/webp", 0.88)) ||
               (await canvasToBlob(canvas, "image/jpeg", 0.88));
    }

    /* Bakes the blur into a copy of the image (cheaper than a live
       CSS blur filter). Rendered smaller, since blur hides detail. */
    async function blurBgImage(blob, px) {
        const bitmap = await createImageBitmap(blob);
        const scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height));
        const w = Math.max(1, Math.round(bitmap.width * scale));
        const h = Math.max(1, Math.round(bitmap.height * scale));
        const blur = px * scale * 1.5;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        ctx.filter = `blur(${blur}px)`;
        /* Draw a bit larger so the edges don't blur into transparency */
        const pad = blur * 2;
        ctx.drawImage(bitmap, -pad, -pad, w + pad * 2, h + pad * 2);
        bitmap.close();

        return canvasToBlob(canvas, "image/jpeg", 0.85);
    }

    function blobToDataURL(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });
    }

    function canLoadImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    let bgUseDataURLs = false;

    async function getBgDisplayURL(key, blob, blur) {
        const isGif = blob.type === "image/gif";
        const cacheKey = `${blob.size}|${blob.type}|${isGif ? 0 : blur}`;
        const shown = bgDisplay.get(key);

        if (shown && shown.cacheKey === cacheKey) {
            return shown.url;
        }

        const source = !isGif && blur > 0 ? await blurBgImage(blob, blur) : blob;
        let url;

        /* blob: URLs are lightest; if the site blocks them, fall back */
        if (!bgUseDataURLs) {
            url = URL.createObjectURL(source);

            if (!(await canLoadImage(url))) {
                URL.revokeObjectURL(url);
                bgUseDataURLs = true;
                url = null;
            }
        }

        if (!url) {
            url = await blobToDataURL(source);
        }

        forgetBgDisplay(key);
        bgDisplay.set(key, { cacheKey, url });
        return url;
    }

    /* Applies one place's background from a settings object */
    async function applyBackgroundState(place, st) {
        const root = document.documentElement;
        const token = (bgApplyToken.get(place.key) || 0) + 1;
        bgApplyToken.set(place.key, token);

        root.style.setProperty(`${place.cssVar}-size`, st.Fit === "tile" ? "auto" : st.Fit);
        root.style.setProperty(`${place.cssVar}-repeat`, st.Fit === "tile" ? "repeat" : "no-repeat");
        root.style.setProperty(`${place.cssVar}-shade`, st.Shade === "light" ? "255, 255, 255" : "0, 0, 0");
        root.style.setProperty(`${place.cssVar}-dim`, String(st.Dim / 100));
        root.style.setProperty(`${place.cssVar}-see`, String(st.SeeThrough || 0));
        root.style.setProperty(`${place.cssVar}-see-channels`, String(st.ChannelSeeThrough || 0));

        const blob = st.Enabled && !liteMode ? await getBgBlob(place.key) : null;
        let url = null;

        if (blob) {
            try {
                url = await getBgDisplayURL(place.key, blob, st.Blur);
            } catch (error) {
                url = null;
            }
        }

        /* A newer call happened while we were loading */
        if (bgApplyToken.get(place.key) !== token) {
            return;
        }

        setBgImageRule(place, url);

        root.classList.toggle(place.cls, Boolean(url));
        markBgHosts();
        root.classList.toggle(place.seeCls, Boolean(url) && (st.SeeThrough > 0 || (st.ChannelSeeThrough || 0) > 0));
        refreshSeeThrough();
    }

    /* The image address goes in its own small <style>, set only on
       the section that shows it. (On <html> it was copied to every
       element on the page, and a big image address made every
       other color change slow.) */
    const bgImageStyles = new Map();   /* place key -> <style> */

    function setBgImageRule(place, url) {
        document.documentElement.style.removeProperty(`${place.cssVar}-image`);   /* older versions */

        let el = bgImageStyles.get(place.key);

        if (!el) {
            el = document.createElement("style");
            el.dataset.fmBgImage = place.key;
            (document.head || document.documentElement).appendChild(el);
            bgImageStyles.set(place.key, el);
        }

        el.textContent = url
            ? `${place.host}, ${place.host}::before { ${place.cssVar}-image: url("${url}"); }`
            : "";
    }

    /* Marks each section that shows an image once, so the image can
       go on its own layer (see style.css "BACKGROUND IMAGES: SPEED").
       Sections that scroll by themselves keep the old way. Cheap:
       up to 3 lookups, each element is only measured once. */
    function markBgHosts() {
        const root = document.documentElement;

        BACKGROUND_PLACES.forEach((place) => {
            if (!root.classList.contains(place.cls)) {
                return;
            }

            if (place.noLayer) {
                return;
            }

            document.querySelectorAll(place.host).forEach((el) => {
                if (el.dataset.fmBgChecked) {
                    return;
                }

                el.dataset.fmBgChecked = "1";
                const cs = getComputedStyle(el);

                if (/auto|scroll/.test(cs.overflowY + cs.overflowX)) {
                    return;
                }

                el.dataset.fmBgLayer = cs.position === "static" ? "rel" : "on";
            });
        });
    }

    function applySavedBackgrounds() {
        BACKGROUND_PLACES.forEach((place) => {
            applyBackgroundState(place, readBgSettings(place));
        });
    }

    /* Reads each panel's real color (with see-through switched off
       for an instant, so nothing flickers) */
    function refreshSeeThrough() {
        const root = document.documentElement;

        BACKGROUND_PLACES.forEach((place) => {
            if (!root.classList.contains(place.seeCls)) {
                return;
            }

            root.classList.remove(place.seeCls);
            place.detected = place.detected || new Set();

            place.see.forEach((target) => {
                const el = document.querySelector(target.detect);

                if (el) {
                    root.style.setProperty(`--fmst-${target.id}`, getComputedStyle(el).backgroundColor);
                    place.detected.add(target.id);
                }
            });

            root.classList.add(place.seeCls);
        });
    }

    /* Some panels only exist later (chat window, user list rows).
       Cheap check, run from the existing 500 ms loop. */
    function checkSeeThroughTargets() {
        const root = document.documentElement;

        markBgHosts();   /* chat / Messenger windows opened later */

        const missing = BACKGROUND_PLACES.some((place) =>
            root.classList.contains(place.seeCls) &&
            place.see.some((t) => !(place.detected && place.detected.has(t.id)) && document.querySelector(t.detect))
        );

        if (missing) {
            refreshSeeThrough();
        }
    }

    function buildBackgroundRowsHTML() {
        const range = (id, name, desc, min, max, unit) => `
            <div class="themeModSetting themeModNoDivider">
                <div class="themeModSettingText">
                    <div class="themeModSettingName">${name}</div>
                    <div class="themeModSettingDescription">${desc}</div>
                </div>
                <div class="themeModRangeControl">
                    <input type="range" id="${id}" class="themeModRange" min="${min}" max="${max}" step="1" value="${min}">
                    <span class="themeModRangeValue" data-unit="${unit}"></span>
                </div>
            </div>`;

        const select = (id, name, desc, options) => `
            <div class="themeModSetting themeModNoDivider">
                <div class="themeModSettingText">
                    <div class="themeModSettingName">${name}</div>
                    <div class="themeModSettingDescription">${desc}</div>
                </div>
                <select id="${id}" class="themeModSelect">
                    ${options.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}
                </select>
            </div>`;

        return BACKGROUND_PLACES.map((place, index) => {
            const p = `themeModBg${place.idPart}`;

            return `
            <div class="themeModSubsectionTitle ${index ? "themeModSpacingSubsection" : ""}">
                ${place.label}
            </div>

            <div class="themeModSetting themeModNoDivider">
                <div class="themeModSettingText">
                    <div class="themeModSettingName">${place.label} Background Image</div>
                    <div class="themeModSettingDescription">${place.imageText}</div>
                </div>

                <label class="themeModToggle" style="margin-right: 10px;">
                    <input type="checkbox" id="${p}Enabled">
                    <span class="themeModToggleTrack">
                        <span class="themeModToggleOption themeModToggleOff">OFF</span>
                        <span class="themeModToggleOption themeModToggleOn">ON</span>
                        <span class="themeModToggleThumb"></span>
                    </span>
                </label>

                <div class="themeModBgThumb" data-bg-thumb="${place.key}" title="No image yet"></div>
            </div>

            <div class="themeModBgButtons">
                <button type="button" class="themeModButton" data-bg-upload="${place.key}">
                    <i class="fas fa-image"></i> Upload image
                </button>
                <button type="button" class="themeModButton themeModDangerButton" data-bg-remove="${place.key}">
                    Remove image
                </button>
                <input type="file" accept="image/*" data-bg-file="${place.key}" style="display: none;">
            </div>

            <div class="themeModBgStatus" data-bg-status="${place.key}" style="display: none;"></div>

            ${select(`${p}Fit`, "Fit", "Fill covers the whole area, Fit shows the whole image, Tile repeats it.",
                [["cover", "Fill"], ["contain", "Fit"], ["tile", "Tile"]])}
            ${select(`${p}Shade`, "Shade", "Darken for dark themes, lighten for light ones.",
                [["dark", "Darken"], ["light", "Lighten"]])}
            ${range(`${p}Dim`, "Shade Amount", "Keeps text readable over the image.", 0, 90, "%")}
            ${range(`${p}Blur`, "Blur", "Softens the image (GIFs stay sharp).", 0, 20, "px")}
            ${!place.see.length ? "" : place.key === "sidebar"
                ? range(`${p}SeeThrough`, "See-through Sections", place.seeText, 0, 100, "%")
                : range(`${p}SeeThrough`, "See-through Message Area", place.seeText, 0, 100, "%") +
                  range(`${p}ChannelSeeThrough`, `See-through ${place.sideName}`, place.sideText, 0, 100, "%")}
            `;
        }).join("");
    }

    function setupBackgroundsPanel(dialog) {
        const panel = dialog.querySelector('[data-theme-panel="backgrounds"]');

        if (!panel) {
            return;
        }

        const controls = BACKGROUND_PLACES.map((place) => {
            const p = `themeModBg${place.idPart}`;
            const inputs = {};

            bgFieldsFor(place).forEach(([suffix]) => {
                inputs[suffix] = dialog.querySelector(`#${p}${suffix}`);
            });

            return {
                place,
                inputs,
                thumb: panel.querySelector(`[data-bg-thumb="${place.key}"]`),
                status: panel.querySelector(`[data-bg-status="${place.key}"]`),
                file: panel.querySelector(`[data-bg-file="${place.key}"]`)
            };
        });

        function readInputs(c) {
            const st = {};

            bgFieldsFor(c.place).forEach(([suffix, type]) => {
                const input = c.inputs[suffix];
                st[suffix] = type === "bool" ? input.checked : type === "int" ? Number(input.value) : input.value;
            });

            return st;
        }

        function writeInputs(c, st) {
            bgFieldsFor(c.place).forEach(([suffix, type]) => {
                const input = c.inputs[suffix];

                if (type === "bool") {
                    input.checked = st[suffix];
                } else {
                    input.value = String(st[suffix]);
                }
            });

            updateRangeLabels(c);
        }

        function updateRangeLabels(c) {
            ["Dim", "Blur", "SeeThrough", "ChannelSeeThrough"].forEach((suffix) => {
                const input = c.inputs[suffix];

                if (!input) {
                    return;
                }

                const label = input.parentElement.querySelector(".themeModRangeValue");
                label.textContent = `${input.value}${label.dataset.unit}`;
            });
        }

        function showStatus(c, message, kind = "ok") {
            c.status.textContent = message;
            c.status.dataset.kind = kind;
            c.status.style.display = message ? "block" : "none";
        }

        async function updateThumb(c) {
            const blob = await getBgBlob(c.place.key);

            if (blob) {
                const url = await getBgDisplayURL(c.place.key, blob, readInputs(c).Blur);
                c.thumb.style.backgroundImage = `url("${url}")`;
                c.thumb.classList.add("hasImage");
                c.thumb.title = "Current image";
            } else {
                c.thumb.style.backgroundImage = "";
                c.thumb.classList.remove("hasImage");
                c.thumb.title = "No image yet";
            }
        }

        /* Blur re-renders the image, so wait until the slider rests */
        let previewTimer = null;

        function preview(c, soon) {
            updateRangeLabels(c);
            clearTimeout(previewTimer);

            const run = () => {
                applyBackgroundState(c.place, readInputs(c)).then(() => updateThumb(c));
            };

            if (soon) {
                previewTimer = setTimeout(run, 120);
            } else {
                run();
            }
        }

        controls.forEach((c) => {
            writeInputs(c, readBgSettings(c.place));
            updateThumb(c);

            Object.entries(c.inputs).forEach(([suffix, input]) => {
                input.addEventListener(input.type === "range" ? "input" : "change", () => {
                    preview(c, suffix === "Blur");
                });
            });

            panel.querySelector(`[data-bg-upload="${c.place.key}"]`).addEventListener("click", () => c.file.click());

            c.file.addEventListener("change", async () => {
                const file = c.file.files && c.file.files[0];
                c.file.value = "";

                if (!file) {
                    return;
                }

                showStatus(c, "Preparing image...");

                try {
                    const blob = await prepareBgImage(file);
                    await setBgBlob(c.place.key, blob);
                    c.inputs.Enabled.checked = true;
                    preview(c);
                    showStatus(c, "Image added! Adjust it below, then press Apply Changes.");
                } catch (error) {
                    showStatus(c, error.message || "That image couldn't be used.", "error");
                }
            });

            panel.querySelector(`[data-bg-remove="${c.place.key}"]`).addEventListener("click", async () => {
                await setBgBlob(c.place.key, null);
                c.inputs.Enabled.checked = false;
                preview(c);
                showStatus(c, "Image removed. Press Apply Changes to save the rest.");
            });
        });

        dialog.querySelector(".themeModApplyButton").addEventListener("click", () => {
            controls.forEach((c) => {
                const st = readInputs(c);
                bgFieldsFor(c.place).forEach(([suffix]) => {
                    localStorage.setItem(bgLsKey(c.place, suffix), String(st[suffix]));
                });
            });
        });

        dialog.querySelector(".themeModResetButton").addEventListener("click", () => {
            controls.forEach((c) => {
                const defaults = {};
                bgFieldsFor(c.place).forEach(([suffix, , def]) => {
                    defaults[suffix] = def;
                    localStorage.setItem(bgLsKey(c.place, suffix), String(def));
                });
                writeInputs(c, defaults);
                preview(c);
            });
        });

        dialog.querySelector(".closeButton").addEventListener("click", () => {
            applySavedBackgrounds();
        });

        /* Changing a color while see-through is on: re-read panel colors */
        /* Waits until you pause for a moment (not every frame), and
           does nothing when no section is see-through */
        let seeTimer = 0;
        const queueSee = () => {
            const root = document.documentElement;

            if (!BACKGROUND_PLACES.some((p) => root.classList.contains(p.seeCls))) {
                return;
            }

            clearTimeout(seeTimer);
            seeTimer = setTimeout(refreshSeeThrough, 120);
        };

        dialog.addEventListener("input", queueSee);
        dialog.addEventListener("change", queueSee);
    }

    /* =========================================================
       SLIDER THUMB SHAPES (Interface > Slider Thumbs)
       The thumb is masked into a shape (keeps its color and the
       number inside). "contain" keeps the shape's proportions.
       OFF = normal thumbs, which Border Radius still rounds.
       ========================================================= */

    const THUMB_SHAPE_ENABLED_LS = "flockmodCustomThumbShapeEnabled";
    const THUMB_SHAPE_LS = "flockmodCustomThumbShape";
    const THUMB_SHAPE_SIZE_LS = "flockmodCustomThumbShapeSize";

    const THUMB_SHAPES = {
        circle: { label: "Circle", svg: '<circle cx="50" cy="50" r="50"/>' },
        heart: {
            label: "Heart",
            svg: '<path d="M50 94 C22 72 2 54 2 32 C2 15 15 4 29 4 C39 4 46 10 50 18 C54 10 61 4 71 4 C85 4 98 15 98 32 C98 54 78 72 50 94Z"/>'
        },
        star: { label: "Star", svg: '<polygon points="50,2 62,36 98,36 69,58 80,94 50,72 20,94 31,58 2,36 38,36"/>' },
        diamond: { label: "Diamond", svg: '<polygon points="50,0 100,50 50,100 0,50"/>' },
        flower: {
            label: "Flower",
            svg: '<g transform="translate(50 50)">' +
                [0, 72, 144, 216, 288].map((deg) =>
                    `<ellipse cx="0" cy="-24" rx="19" ry="26" transform="rotate(${deg})"/>`
                ).join("") +
                '<circle r="18"/></g>'
        },
        cat: {
            label: "Cat",
            /* round head + two pointy ears */
            svg: '<ellipse cx="50" cy="60" rx="42" ry="35"/>' +
                 '<polygon points="10,48 16,2 46,30"/>' +
                 '<polygon points="90,48 84,2 54,30"/>'
        },
        dog: {
            label: "Dog",
            /* head + two floppy ears hanging at the sides */
            svg: '<ellipse cx="50" cy="52" rx="31" ry="38"/>' +
                 '<ellipse cx="17" cy="42" rx="14" ry="30" transform="rotate(18 17 42)"/>' +
                 '<ellipse cx="83" cy="42" rx="14" ry="30" transform="rotate(-18 83 42)"/>'
        },
        fish: {
            label: "Fish",
            /* body + tail, number sits in the body */
            svg: '<ellipse cx="42" cy="50" rx="40" ry="28"/>' +
                 '<polygon points="66,50 99,20 92,50 99,80"/>'
        }
    };

    /* The mask also cuts off the number, so each shape gets a font size
       (px) and a nudge (px) that puts the number in the
       widest part of the shape, where "100" still fits. */
    const THUMB_TEXT_FIT = {
        circle:  { size: 10,  x: 0,  y: 0 },
        heart:   { size: 9,   x: 0,  y: -2 },  /* widest near the top lobes */
        star:    { size: 7.5, x: 0,  y: 1 },   /* star's middle sits low */
        diamond: { size: 8,   x: 0,  y: 0 },
        flower:  { size: 9,   x: 0,  y: 0 },
        cat:     { size: 9,   x: 0,  y: 2 },   /* face is below the ears */
        dog:     { size: 9,   x: 0,  y: 1 },
        fish:    { size: 9,   x: -2, y: 0 }    /* body is left of the tail */
    };

    const THUMB_SHAPE_CHOICES = Object.keys(THUMB_SHAPES);
    const thumbMaskCache = new Map();

    async function getThumbMaskURL(shape) {
        if (thumbMaskCache.has(shape)) {
            return thumbMaskCache.get(shape);
        }

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#000">${THUMB_SHAPES[shape].svg}</svg>`;
        let url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));

        /* If the site blocks blob: images, use a data: URL instead */
        if (!(await canLoadImage(url))) {
            URL.revokeObjectURL(url);
            url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
        }

        thumbMaskCache.set(shape, url);
        return url;
    }

    let thumbShapeToken = 0;

    async function applyThumbShape(enabled, shape, size = 100) {
        const root = document.documentElement;
        const token = ++thumbShapeToken;

        root.style.setProperty("--flockmod-thumb-size", String(size / 100));

        if (!enabled || !THUMB_SHAPES[shape]) {
            root.classList.remove("flockmodThumbShapeActive");
            return;
        }

        const url = await getThumbMaskURL(shape);

        if (token !== thumbShapeToken) {
            return;
        }

        const fit = THUMB_TEXT_FIT[shape] || THUMB_TEXT_FIT.circle;
        root.style.setProperty("--flockmod-thumb-font", `${fit.size}px`);
        root.style.setProperty("--flockmod-thumb-text-x", `${fit.x}px`);
        root.style.setProperty("--flockmod-thumb-text-y", `${fit.y}px`);
        root.style.setProperty("--flockmod-thumb-mask", `url("${url}")`);
        root.classList.add("flockmodThumbShapeActive");
        makeThumbRoom();
    }

    /* A bigger thumb can be cut off by the box around its slider.
       Only boxes that are plain "display: block" with hidden overflow
       are changed (to flow-root + visible, which lays out the same);
       anything else (flex rows, scroll areas) is left alone. */

    /* =========================================================
       CHAT HIGHLIGHTS (v1.6.3, Interface > Chat Highlights)
       Lines that mention your name (or the extra words from Sounds >
       Your name mentioned) get a soft highlight, in chat (public,
       staff, any channel) and in Messenger. Your own messages are
       skipped. Only adds a class: FlockMod's messages aren't changed.
       ========================================================= */
    const HL_ENABLED_LS = "flockmodChatHighlightEnabled";
    const HL_COLOR_LS = "flockmodChatHighlightColor";
    const HL_DEFAULT_COLOR = "#f48fb1";
    let liveHighlight = { enabled: true, color: HL_DEFAULT_COLOR };

    function readSavedChatHighlight() {
        const color = localStorage.getItem(HL_COLOR_LS);
        return {
            enabled: localStorage.getItem(HL_ENABLED_LS) !== "false",
            color: /^#[0-9a-f]{6}$/i.test(color || "") ? color : HL_DEFAULT_COLOR
        };
    }

    function applyChatHighlight(st) {
        liveHighlight = st;
        const root = document.documentElement;
        root.classList.toggle("fmHlOn", st.enabled);
        root.style.setProperty("--fm-hl-color", st.color);
        chatHighlightRescanSoon();
    }

    function applySavedChatHighlight() {
        applyChatHighlight(readSavedChatHighlight());
    }

    const HL_CHAT_LINES = '.messageBlock:not([data-type="MYMSG"]) .msgLine';
    const HL_MSGR_ITEMS = ".offlineMessage:not(.offlineOwn)";

    function hlCheck(el) {
        const textEl = el.matches(".msgLine") ? el.querySelector(".msgText") : el;
        const hit = Boolean(liveHighlight.enabled && textEl && isMention(textEl.textContent || ""));

        if (el.classList.contains("fmHl") !== hit) {
            el.classList.toggle("fmHl", hit);
        }
    }

    let hlTimer = 0;
    function chatHighlightRescanSoon() {
        clearTimeout(hlTimer);
        hlTimer = setTimeout(() => {
            const chat = document.getElementById("chatMessages");
            const msgr = document.getElementById("messengerConversation");

            if (!liveHighlight.enabled) {
                document.querySelectorAll(".fmHl").forEach((el) => el.classList.remove("fmHl"));
                return;
            }

            chat?.querySelectorAll(HL_CHAT_LINES).forEach(hlCheck);
            msgr?.querySelectorAll(HL_MSGR_ITEMS).forEach(hlCheck);
        }, 150);
    }

    const hlWatches = { chat: { id: "chatMessages", el: null, obs: null }, msgr: { id: "messengerConversation", el: null, obs: null } };

    /* From the 500ms loop: (re)attach when FlockMod makes or replaces the boxes */
    function watchChatHighlight() {
        Object.entries(hlWatches).forEach(([kind, w]) => {
            const el = document.getElementById(w.id);

            if (el === w.el) {
                return;
            }

            w.obs?.disconnect();
            w.el = el;
            w.obs = null;

            if (!el) {
                return;
            }

            w.obs = new MutationObserver((records) => {
                if (!liveHighlight.enabled) {
                    return;
                }

                records.forEach((record) => record.addedNodes.forEach((node) => {
                    if (node.nodeType !== 1) {
                        return;
                    }

                    if (kind === "chat") {
                        if (node.closest('.messageBlock[data-type="MYMSG"]')) return;
                        if (node.matches(".msgLine")) hlCheck(node);
                        else node.querySelectorAll?.(".msgLine").forEach((line) => {
                            if (!line.closest('.messageBlock[data-type="MYMSG"]')) hlCheck(line);
                        });
                    } else {
                        const item = node.matches(HL_MSGR_ITEMS) ? node : node.closest?.(HL_MSGR_ITEMS);
                        if (item) hlCheck(item);
                        else node.querySelectorAll?.(HL_MSGR_ITEMS).forEach(hlCheck);
                    }
                }));
            });
            w.obs.observe(el, { childList: true, subtree: true });
            chatHighlightRescanSoon();
        });
    }

    function buildChatHighlightRowsHTML() {
        return `
<div class="themeModSubsectionTitle themeModSpacingSubsection">
    Chat Highlights
</div>

<div class="themeModSetting themeModNoDivider">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Highlight mentions</div>
        <div class="themeModSettingDescription">
            Lines with your name light up in chat and Messenger. Add more words in Sounds &gt; Your name mentioned.
        </div>
    </div>
    <label class="themeModToggle" style="margin-right: 10px;">
        <input type="checkbox" id="themeModChatHighlight" data-default="true" checked>
        <span class="themeModToggleTrack">
            <span class="themeModToggleOption themeModToggleOff">OFF</span>
            <span class="themeModToggleOption themeModToggleOn">ON</span>
            <span class="themeModToggleThumb"></span>
        </span>
    </label>
    <input type="color" id="themeModChatHighlightColor" value="${HL_DEFAULT_COLOR}" data-default="${HL_DEFAULT_COLOR}" title="Highlight color">
</div>`;
    }

    function setupChatHighlight(dialog) {
        const toggle = dialog.querySelector("#themeModChatHighlight");
        const color = dialog.querySelector("#themeModChatHighlightColor");

        if (!toggle || !color) {
            return;
        }

        const fill = (st) => {
            toggle.checked = st.enabled;
            color.value = st.color;
        };
        const read = () => ({ enabled: toggle.checked, color: color.value });
        const preview = () => applyChatHighlight(read());

        fill(readSavedChatHighlight());
        toggle.addEventListener("change", preview);
        color.addEventListener("input", preview);

        dialog.querySelector(".themeModApplyButton").addEventListener("click", () => {
            const st = read();
            localStorage.setItem(HL_ENABLED_LS, String(st.enabled));
            localStorage.setItem(HL_COLOR_LS, st.color);
        });

        dialog.querySelector(".themeModResetButton").addEventListener("click", () => {
            localStorage.setItem(HL_ENABLED_LS, "true");
            localStorage.setItem(HL_COLOR_LS, HL_DEFAULT_COLOR);
            fill(readSavedChatHighlight());
            preview();
        });

        dialog.querySelector(".closeButton").addEventListener("click", applySavedChatHighlight);
    }


    /* =========================================================
       CHAT NOTIFICATIONS (v1.6.3, Interface > Chat Notifications)
       New chat messages pop up as small cards on the side of the
       canvas AWAY from the sidebar, so you can draw with the chat
       closed. Hover the cards (or the pill) for a reply box and a
       Public / Staff / PM switcher. PMs get one card per person and
       name chips (5 most recent, "+N" opens FlockMod's own chat).
       Replies are typed into FlockMod's own chat box and sent with
       its own Send button: nothing new is sent to the server.
       One MutationObserver on #chatMessages; nothing runs while
       no messages arrive.
       ========================================================= */
    const CN_LS = {
        on: "flockmodChatNotifEnabled",
        closedOnly: "flockmodChatNotifClosedOnly",
        ownRight: "flockmodChatNotifOwnRight",
        size: "flockmodChatNotifSize",
        stay: "flockmodChatNotifStay",
        width: "flockmodChatNotifWidth",
        hidden: "flockmodChatNotifHidden"
    };
    const CN_DEFAULTS = { on: true, closedOnly: true, ownRight: true, size: 100, stay: 8 };
    /* v1.6.3: the chat overlay starts ON for everyone, once. Anyone who
       switched it off or hid it while it was being tested gets it back;
       after that, their own choice sticks. */
    try {
        if (!localStorage.getItem("flockmodChatNotifOnByDefault")) {
            localStorage.removeItem(CN_LS.on);
            localStorage.removeItem(CN_LS.hidden);
            localStorage.setItem("flockmodChatNotifOnByDefault", "1");
        }
    } catch (err) { /* storage blocked: defaults apply anyway */ }
    const CN_MAX_CARDS = 5;
    const CN_MAX_CHIPS = 5;
    const CN_MAX_LINES = 3;   /* lines shown per card */
    const CN_WIDTH_DEFAULT = 260;
    const CN_SELECTOR = ".fmCnStack";

    let liveCn = { ...CN_DEFAULTS };
    let cnStack = null;
    let cnTarget = { kind: "public", channel: "#public" };   /* where you reply AND which chat the cards show */
    const cnViewUnread = new Set();   /* "public", "staff", "@Name": new messages you haven't viewed */
    const cnRecent = new Map();       /* each chat -> its last few messages (yours too) */
    const cnMissed = new Map();       /* each chat -> how many of those you haven't seen */
    const CN_MAX_RECENT = 50;         /* per chat, since you joined the room (scroll up to see them) */
    const CN_CONTEXT = 2;             /* already-read messages shown again when you come back */
    let cnNextId = 1;

    function cnRemember(view, m) {
        const list = cnRecent.get(view) || [];
        const entry = { ...m, id: cnNextId++, time: m.time || cnClock() };
        list.push(entry);
        while (list.length > CN_MAX_RECENT) list.shift();
        cnRecent.set(view, list);
        return entry;
    }

    /* A message you couldn't see yet (another tab, or "Hide chat") */
    function cnKeepPending(view) {
        cnMissed.set(view, (cnMissed.get(view) || 0) + 1);
    }

    /* Opening a chat shows what you missed there plus the last couple of
       messages before it, so you know what you're replying to */
    function cnShowPending(view, context = CN_CONTEXT) {
        const want = Math.min(CN_MAX_CARDS, (cnMissed.get(view) || 0) + context);
        cnMissed.delete(view);
        const list = cnRecent.get(view) || [];
        /* count messages only: events in between come along but don't use up the count */
        let start = list.length, got = 0;
        while (start > 0 && got < want) {
            start--;
            if (!list[start].event) got++;
        }
        list.slice(start).forEach((m) => cnAddCard({ ...m, replay: true, noAnim: true }));
    }

    /* Scrolling up past the top card brings back that chat's earlier messages */
    function cnLoadEarlier() {
        const list = cnStack?.querySelector(".fmCnList");
        if (!list) return;
        const view = cnViewKey(cnTarget.kind, cnTarget.channel);
        const entries = cnRecent.get(view) || [];
        const first = [...list.children].find((c) => c.dataset.mid && !c.classList.contains("fmCnOut"));
        const idx = first ? entries.findIndex((e) => String(e.id) === first.dataset.mid) : entries.length;

        if (idx <= 0) return;

        const before = list.scrollHeight;
        entries.slice(Math.max(0, idx - 8), idx).reverse()
            .forEach((m) => cnAddCard({ ...m, replay: true, noAnim: true, prepend: true, earlier: true }));
        list.scrollTop += list.scrollHeight - before;   /* keep what you were looking at in place */
    }
    let cnUnread = 0;
    const cnRecentPm = [];          /* "@Name", newest first */
    const cnWatch = { el: null, obs: null, armedAt: 0 };

    function readSavedChatNotif() {
        const int = (key, min, max, def) => {
            const n = Number(localStorage.getItem(key));
            return Number.isInteger(n) && n >= min && n <= max ? n : def;
        };
        return {
            on: localStorage.getItem(CN_LS.on) !== "false",
            closedOnly: localStorage.getItem(CN_LS.closedOnly) !== "false",
            ownRight: localStorage.getItem(CN_LS.ownRight) !== "false",   /* default ON */
            size: int(CN_LS.size, 70, 150, CN_DEFAULTS.size),
            stay: int(CN_LS.stay, 3, 30, CN_DEFAULTS.stay)
        };
    }

    function applyChatNotif(st) {
        liveCn = st;
        document.documentElement.classList.toggle("fmCnOn", st.on);
        document.documentElement.classList.toggle("fmCnOwnRight", st.ownRight !== false);

        if (st.on) {
            buildCnStack();
            cnStack.style.setProperty("--fmcn-s", String(st.size / 100));
            cnPlace();
        } else if (cnStack) {
            cnStack.querySelector(".fmCnList").textContent = "";
        }
    }

    function applySavedChatNotif() {
        applyChatNotif(readSavedChatNotif());
    }

    /* ---------- FlockMod's chat window ---------- */

    function cnChatDialog() {
        return document.querySelector('.dialog[name="chat"]');
    }

    function cnChatIsOpen() {
        const d = cnChatDialog();
        return Boolean(d && !d.classList.contains("dialogInvisible") &&
            d.classList.contains("dialogVisible") && d.getClientRects().length);
    }

    function cnTitles() {
        const d = cnChatDialog();
        return d ? [...d.querySelectorAll(".channelTitle")] : [];
    }

    function cnTitleFor(channel) {
        return cnTitles().find((t) => t.getAttribute("name") === channel) || null;
    }

    function cnKindOf(channel) {
        if (channel === "#staff") return "staff";
        return channel.startsWith("@") ? "pm" : "public";
    }

    function cnCanUseStaff() {
        const t = cnTitleFor("#staff");
        /* FlockMod only shows #staff to staff. Its lock icon just means
           "staff only", not that you can't post there. */
        return Boolean(t);
    }

    function cnPmChannels() {
        const open = cnTitles()
            .filter((t) => t.dataset.type === "user")
            .map((t) => t.getAttribute("name"));
        /* most recent first, then the rest in the chat's own order */
        return [...cnRecentPm.filter((c) => open.includes(c)), ...open.filter((c) => !cnRecentPm.includes(c))];
    }

    function cnHasUnread(channel) {
        const t = cnTitleFor(channel);
        return Boolean(t && t.querySelector(".channelIcons .badge"));
    }

    /* Opens FlockMod's chat (top bar button), optionally on a channel */
    function cnOpenChat(channel) {
        if (!cnChatIsOpen()) {
            const button = [...document.querySelectorAll(".topbarButtons .nav-link")].find((a) =>
                a.querySelector(".fa-comment, .fa-comments, .fa-comment-dots") || /chat/i.test(a.textContent || ""));
            button?.click();
        }

        if (channel) {
            setTimeout(() => cnSelectChannel(cnTitleFor(channel)), 50);
        }
    }

    function cnSelectChannel(title) {
        if (!title || title.classList.contains("selected")) {
            return;
        }

        title.click();

        if (!title.classList.contains("selected")) {
            ["mousedown", "mouseup"].forEach((type) =>
                title.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window })));
        }
    }

    const cnWait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function cnWaitSelected(title, ms) {
        for (let t = 0; t < ms; t += 40) {
            if (title.classList.contains("selected")) return true;
            await cnWait(40);
        }
        return title.classList.contains("selected");
    }

    function cnPokeTitle(title) {
        const caption = title.querySelector(".channelCaption") || title;
        caption.click();
        ["pointerdown", "mousedown", "pointerup", "mouseup"].forEach((type) => {
            const Ev = type.startsWith("pointer") && window.PointerEvent ? PointerEvent : MouseEvent;
            caption.dispatchEvent(new Ev(type, { bubbles: true, cancelable: true, view: window, button: 0 }));
        });
    }

    /* With its chat closed, FlockMod ignores channel switches. So for a
       moment the chat is "open" but invisible (nothing shows, nothing can
       be clicked), we switch and send, then it goes back to closed. */
    function cnRevealChat(d) {
        if (!d.classList.contains("dialogInvisible")) {
            return () => {};
        }

        const cls = d.className;
        const vis = d.style.visibility;
        const pe = d.style.pointerEvents;
        d.style.visibility = "hidden";
        d.style.pointerEvents = "none";
        d.classList.remove("dialogInvisible");
        d.classList.add("dialogVisible");

        return () => {
            d.className = cls;
            d.style.visibility = vis;
            d.style.pointerEvents = pe;
        };
    }

    /* Sends with FlockMod's own chat box + Send button. Resolves true when
       sent, false if FlockMod wouldn't switch (then nothing is sent). */
    let cnSending = Promise.resolve();

    function cnSend(channel, text, file) {
        const job = cnSending.then(() => cnSendNow(channel, text, file));
        cnSending = job.catch(() => false);
        return job;
    }

    async function cnSendNow(channel, text, file) {
        const d = cnChatDialog();
        const title = cnTitleFor(channel);
        const input = d?.querySelector('.chatTextGroup input[name="text"]');
        const button = d?.querySelector('.chatTextGroup button[name="submit"]');

        if (!title || !input || !button) {
            return false;
        }

        const before = d.querySelector(".channelTitle.selected");
        const draft = input.value;
        let restore = () => {};

        try {
            if (!title.classList.contains("selected")) {
                title.click();

                if (!await cnWaitSelected(title, 120)) {
                    cnPokeTitle(title);
                }
                if (!await cnWaitSelected(title, 120)) {
                    restore = cnRevealChat(d);
                    title.click();
                    if (!await cnWaitSelected(title, 200)) cnPokeTitle(title);
                }

                /* Never send into the wrong channel: if FlockMod didn't switch, stop */
                if (!await cnWaitSelected(title, 300)) {
                    cnDebug("couldn't switch to", channel);
                    return false;
                }
            }

            input.value = text;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            lastSentAt = Date.now();   /* so your own message doesn't ding */

            if (file) {
                /* The same as pasting the picture into FlockMod's chat box:
                   FlockMod shows its preview, then Send sends it. */
                const preview = d.querySelector("#imagePreviewContainer");
                const empty = preview ? preview.innerHTML : "";
                const shows = () => preview && preview.innerHTML !== empty;
                const waitFor = async (test, ms) => {
                    for (let t = 0; t < ms; t += 50) {
                        if (test()) return true;
                        await cnWait(50);
                    }
                    return test();
                };
                const dt = new DataTransfer();
                dt.items.add(file);

                /* First: FlockMod's own chat "attach picture" box (the chat's
                   picture button), which only goes to the chat */
                const picker = d.querySelector('input[type="file"][name="imageFile"]');
                if (picker) {
                    picker.files = dt.files;
                    picker.dispatchEvent(new Event("change", { bubbles: true }));
                }

                if (!await waitFor(shows, 1500)) {
                    /* Else a paste into the chat box, stopped at the chat window
                       so FlockMod's board never sees it */
                    const paste = new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true });
                    const fence = (event) => { if (event === paste) event.stopPropagation(); };
                    d.addEventListener("paste", fence);
                    input.dispatchEvent(paste);
                    d.removeEventListener("paste", fence);
                }

                if (!await waitFor(shows, 2500)) {
                    cnDebug("FlockMod didn't show a preview for the picture");
                    input.value = draft;
                    return "image";
                }

                button.click();
                const gone = await waitFor(() => !shows(), 4000);
                if (draft && !input.value) input.value = draft;
                if (before && before !== title) {
                    before.click();
                    if (!await cnWaitSelected(before, 120)) cnPokeTitle(before);
                }
                return gone ? true : "image";
            }

            button.click();
            await cnWait(60);

            /* Send button didn't take it: try Enter in the box */
            if (input.value === text) {
                ["keydown", "keypress", "keyup"].forEach((type) => input.dispatchEvent(
                    new KeyboardEvent(type, { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, cancelable: true })));
                await cnWait(80);
            }

            const sent = input.value !== text ? true : false;

            if (draft && !input.value) {
                input.value = draft;   /* give back what was typed in the real chat */
            }

            /* go back to the channel you were looking at in FlockMod's chat */
            if (before && before !== title) {
                before.click();
                if (!await cnWaitSelected(before, 120)) cnPokeTitle(before);
            }

            return sent;
        } finally {
            restore();
        }
    }

    /* ---------- The cards ---------- */

    /* ---------- Emoji: FlockMod's own allowed set ----------
       Read from FlockMod's emoji picker (category by category), so the
       cards only offer emoji FlockMod accepts. Read once, then kept. */
    let cnEmojiCache = null;

    function cnEmojiFont(el) {
        const font = el ? getComputedStyle(el).fontFamily : "";
        if (font && cnStack) cnStack.style.setProperty("--fmcn-emoji-font", font);
    }

    async function cnReadEmojiPicker(box) {
        const cats = [...box.querySelectorAll(".categories a[name]")];
        const was = box.querySelector(".categories a.selected");
        const list = () => [...box.querySelectorAll(".emojis .os-content > a, .emojis a")]
            .map((a) => (a.textContent || "").trim()).filter(Boolean);
        const stopJump = (event) => event.preventDefault();
        const out = [];

        cnEmojiFont(box.querySelector(".emojis a"));

        for (const cat of cats) {
            cat.addEventListener("click", stopJump, { capture: true, once: true });
            cat.click();
            await cnWait(30);
            const items = [...new Set(list())];
            if (items.length) {
                out.push({ name: cat.getAttribute("name"), icon: (cat.textContent || "").trim(), items });
            }
        }

        if (was && was !== box.querySelector(".categories a.selected")) {
            was.addEventListener("click", stopJump, { capture: true, once: true });
            was.click();
        }
        return out;
    }

    async function cnLoadEmoji() {
        if (cnEmojiCache) return cnEmojiCache;

        let box = document.querySelector(".emojiContainer");
        let undo = () => {};

        if (!box) {
            /* FlockMod builds its picker the first time it's opened: open it
               out of sight for a moment, read it, close it again */
            const d = cnChatDialog();
            const btn = d?.querySelector('button[name="emoji"], .newEmoji');
            if (!btn) return [];
            const hide = document.createElement("style");
            hide.textContent = ".emojiContainer { visibility: hidden !important; }";
            document.head.appendChild(hide);
            const restore = cnRevealChat(d);
            btn.click();
            for (let t = 0; t < 1000 && !box; t += 50) {
                await cnWait(50);
                box = document.querySelector(".emojiContainer");
            }
            undo = () => {
                const c = document.querySelector(".emojiContainer");
                c?.querySelector(".background")?.click();
                if (c && getComputedStyle(c).display !== "none") c.style.display = "none";
                restore();
                hide.remove();
            };
        }

        try {
            const sets = box ? await cnReadEmojiPicker(box) : [];
            if (sets.length) cnEmojiCache = sets;
            return sets;
        } finally {
            undo();
        }
    }

    /* FlockMod's whole app sits in a full-screen layer (.contentScreen,
       z-index 999998). The cards go inside it, or they'd be underneath. */
    function cnHost() {
        /* There can be several screens; use the one the canvas is on */
        const drawing = document.getElementById("DrawingArea");
        return drawing?.closest(".contentScreen") ||
            [...document.querySelectorAll(".contentScreen")].find((el) => el.getClientRects().length) ||
            document.body;
    }

    function buildCnStack() {
        if (cnStack) {
            return;
        }

        cnStack = document.createElement("div");
        cnStack.className = "fmCnStack fmCnLeft";
        cnStack.innerHTML = `
<div class="fmCnGrip" title="Drag to resize"></div>
<div class="fmCnList"></div>
<div class="fmCnExtra"><div class="fmCnExtraIn">
    <div class="fmCnPeople"></div>
    <div class="fmCnAttach" hidden><img alt=""><button type="button" class="fmCnUnattach" title="Remove picture" aria-label="Remove picture"><i class="fas fa-times"></i></button></div>
    <div class="fmCnEmojiPanel" hidden><div class="fmCnEmojiCats"></div><div class="fmCnEmojiGrid"></div></div>
    <div class="fmCnTagList" hidden></div>
    <div class="fmCnReplyRow">
        <button type="button" class="fmCnEmo" title="Emoji" aria-label="Emoji"><i class="fas fa-smile"></i></button>
        <button type="button" class="fmCnPic" title="Add a picture (or paste one)" aria-label="Add a picture"><i class="fas fa-image"></i></button>
        <input class="fmCnFile" type="file" accept="image/*" hidden>
        <input class="fmCnInput" type="text" maxlength="250" autocomplete="off" spellcheck="true">
        <button type="button" class="fmCnSend" title="Send" aria-label="Send"><i class="fas fa-paper-plane"></i></button>
    </div>
    <div class="fmCnNote"></div>
</div></div>
<div class="fmCnTabs">
    <button type="button" data-cn-tab="public">Public</button>
    <button type="button" data-cn-tab="staff">Staff</button>
    <button type="button" data-cn-tab="pm">PM</button>
</div>
<button type="button" class="fmCnPill"><i class="fas fa-comment"></i><span class="fmCnPillText">Hide chat</span><span class="fmCnBadge"></span></button>`;
        cnHost().appendChild(cnStack);

        const input = cnStack.querySelector(".fmCnInput");
        const width = Number(localStorage.getItem(CN_LS.width));
        cnStack.style.width = `${width >= 180 && width <= 480 ? width : CN_WIDTH_DEFAULT}px`;
        cnStack.classList.toggle("fmCnCollapsed", localStorage.getItem(CN_LS.hidden) === "true");
        cnUpdatePill();

        /* A picture waiting to go out with the next message */
        const attach = cnStack.querySelector(".fmCnAttach");
        const fileInput = cnStack.querySelector(".fmCnFile");
        let pending = null;

        const setPending = (file) => {
            const img = attach.querySelector("img");
            if (img.src.startsWith("blob:")) URL.revokeObjectURL(img.src);
            pending = file && /^image\//.test(file.type) ? file : null;
            attach.hidden = !pending;
            img.src = pending ? URL.createObjectURL(pending) : "";
        };

        /* Copy/cut/paste inside the cards stay inside the cards. FlockMod
           listens for pastes on the whole page and puts pictures on the
           board, so it must never see these. (Runs first, on window.) */
        ["copy", "cut", "paste"].forEach((type) => window.addEventListener(type, (event) => {
            if (!cnStack.contains(event.target) && !(type === "copy" && cnHasSelection())) {
                return;
            }
            event.stopImmediatePropagation();

            if (type === "paste" && event.target === input) {
                const item = [...(event.clipboardData?.items || [])].find((i) => i.kind === "file" && /^image\//.test(i.type));
                const file = item?.getAsFile();
                if (file) {
                    event.preventDefault();
                    setPending(file);
                }
            }
        }, true));

        /* Selecting card text with the mouse: FlockMod is a drawing app and
           treats mouse-downs as its own, so presses on a card stop here */
        ["pointerdown", "mousedown", "selectstart", "dragstart"].forEach((type) =>
            cnStack.addEventListener(type, (event) => {
                if (event.target.closest?.(".fmCnCard")) event.stopPropagation();
            }));

        /* Ctrl+C / Cmd+C with card text selected: copy that text, and keep
           FlockMod from treating it as copying from the board */
        window.addEventListener("keydown", (event) => {
            if (!(event.ctrlKey || event.metaKey) || event.altKey || event.key.toLowerCase() !== "c" || !cnHasSelection()) {
                return;
            }
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return;   /* copying inside a text box works as usual */
            }
            event.stopImmediatePropagation();
            const text = window.getSelection().toString();
            navigator.clipboard?.writeText(text).catch(() => {});
        }, true);
        cnStack.querySelector(".fmCnPic").addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", () => {
            setPending(fileInput.files[0] || null);
            fileInput.value = "";
            input.focus({ preventScroll: true });
        });
        cnStack.querySelector(".fmCnUnattach").addEventListener("click", () => {
            setPending(null);
            input.focus({ preventScroll: true });
        });

        /* Emoji panel */
        const emoPanel = cnStack.querySelector(".fmCnEmojiPanel");
        const emoCats = emoPanel.querySelector(".fmCnEmojiCats");
        const emoGrid = emoPanel.querySelector(".fmCnEmojiGrid");
        let emoSets = [];

        const showEmojiSet = (i) => {
            emoGrid.textContent = "";
            [...emoCats.children].forEach((b, n) => b.classList.toggle("active", n === i));
            (emoSets[i]?.items || []).forEach((ch) => {
                const b = document.createElement("button");
                b.type = "button";
                b.textContent = ch;
                emoGrid.appendChild(b);
            });
        };

        emoCats.addEventListener("click", (event) => {
            const b = event.target.closest("button");
            if (b) showEmojiSet([...emoCats.children].indexOf(b));
        });

        emoGrid.addEventListener("click", (event) => {
            const b = event.target.closest("button");
            if (!b) return;
            const ch = b.textContent;
            const start = input.selectionStart ?? input.value.length;
            const end = input.selectionEnd ?? input.value.length;
            if (input.value.length - (end - start) + ch.length > 250) return;
            input.value = input.value.slice(0, start) + ch + input.value.slice(end);
            input.focus({ preventScroll: true });
            input.setSelectionRange(start + ch.length, start + ch.length);
        });

        cnStack.querySelector(".fmCnEmo").addEventListener("click", async () => {
            if (!emoPanel.hidden) {
                emoPanel.hidden = true;
                input.focus({ preventScroll: true });
                return;
            }
            emoSets = await cnLoadEmoji();
            if (!emoSets.length) {
                cnNote("Couldn't find FlockMod's emoji list. Open FlockMod's emoji picker once, then try again.");
                return;
            }
            emoCats.textContent = "";
            emoSets.forEach((set) => {
                const b = document.createElement("button");
                b.type = "button";
                b.textContent = set.icon || "•";
                b.title = set.name;
                emoCats.appendChild(b);
            });
            emoPanel.hidden = false;
            showEmojiSet(0);
            input.focus({ preventScroll: true });
        });
        input.addEventListener("themeModEscape", () => { emoPanel.hidden = true; });

        const send = async () => {
            const text = input.value.trim();
            const target = { ...cnTarget };
            const file = pending;

            if (!text && !file) {
                return;
            }

            input.value = "";
            emoPanel.hidden = true;
            const shown = file ? URL.createObjectURL(file) : "";
            if (file) setPending(null);

            const ok = await cnSend(target.channel, text, file);

            /* FlockMod moves the cursor to its own chat box when it switches
               channels. Put it back here so you can keep typing. */
            const refocus = () => {
                if (document.activeElement !== input && cnStack.isConnected) {
                    input.focus({ preventScroll: true });
                }
            };
            refocus();
            setTimeout(refocus, 120);

            if (ok !== true) {
                if (!input.value) input.value = text;   /* keep what you wrote */
                if (file && !pending) setPending(file);
                if (shown) URL.revokeObjectURL(shown);
                cnNote(ok === "image"
                    ? "FlockMod didn't take that picture (it may be too big), so nothing was sent."
                    : "FlockMod wouldn't switch to that chat, so nothing was sent.");
                return;
            }

            const src = document.createElement("div");
            if (text) src.append(text);
            if (shown) {
                const img = document.createElement("img");
                img.src = shown;
                src.append(img);
            }

            cnSentByCards.set(cnSentKey(target.channel, text || "[image]"), Date.now());
            cnTouchPm(target.channel);

            cnAddCard({
                key: `you|${target.channel}`,
                kind: target.kind,
                user: "You",
                where: target.kind === "pm" ? `→ ${target.channel.slice(1)}` : `· ${cnLabel(target.channel)}`,
                text: text || "[image]",
                srcs: [src],
                own: true
            });

            /* Use FlockMod's own time for it once it shows in the chat */
            const card = cnStack.querySelector(".fmCnList")?.lastElementChild;
            setTimeout(() => {
                const mine = [...document.querySelectorAll(`#chatMessages .channelMessages[name="${CSS.escape(target.channel)}"] .chatBlock[data-type="MYMSG"]`)].pop();
                const stamp = mine ? cnTimeOf([...mine.querySelectorAll(".msgLine")], mine) : "";
                const el = card?.querySelector(".fmCnTime");
                if (stamp && el) {
                    el.textContent = stamp;
                    const last = card.querySelector(".fmCnLine:last-child");
                    if (last) last.title = stamp;
                }
            }, 700);
        };

        /* @ tagging, like FlockMod's chat: type @ and pick a name */
        const tagList = cnStack.querySelector(".fmCnTagList");
        let tagPick = 0;

        const tagQuery = () => {
            const caret = input.selectionStart ?? input.value.length;
            const m = input.value.slice(0, caret).match(/(^|\s)@([^\s@]{0,40})$/);
            return m ? { text: m[2], start: caret - m[2].length - 1, end: caret } : null;
        };

        const closeTags = () => {
            tagList.hidden = true;
            tagList.textContent = "";
        };

        const showTags = () => {
            const q = tagQuery();
            if (!q) return closeTags();

            const lower = q.text.toLowerCase();
            const users = [...readUserRows()].filter(([name]) => name.toLowerCase().startsWith(lower)).slice(0, 6);
            if (!users.length) return closeTags();

            tagPick = Math.min(tagPick, users.length - 1);
            tagList.textContent = "";
            users.forEach(([name, u], i) => {
                const b = document.createElement("button");
                b.type = "button";
                b.textContent = name;
                b.dataset.name = name;
                const rank = cnRankOf(u.cell);
                if (rank) b.classList.add(rank);
                b.classList.toggle("active", i === tagPick);
                tagList.appendChild(b);
            });
            tagList.hidden = false;
        };

        const pickTag = (name) => {
            const q = tagQuery();
            if (!q || !name) return;
            const insert = `@${name} `;
            input.value = input.value.slice(0, q.start) + insert + input.value.slice(q.end);
            const at = q.start + insert.length;
            input.focus({ preventScroll: true });
            input.setSelectionRange(at, at);
            closeTags();
        };

        input.addEventListener("input", () => { tagPick = 0; showTags(); });
        input.addEventListener("click", showTags);
        input.addEventListener("blur", () => setTimeout(closeTags, 150));
        tagList.addEventListener("mousedown", (event) => event.preventDefault());   /* keep typing focus */
        tagList.addEventListener("click", (event) => pickTag(event.target.closest("button")?.dataset.name));

        input.addEventListener("themeModKey", (event) => {
            if (tagList.hidden) return;
            const items = [...tagList.children];
            if (event.detail.key === "Tab") {
                event.preventDefault();
                pickTag(items[tagPick]?.dataset.name);
                return;
            }
            event.preventDefault();
            tagPick = (tagPick + (event.detail.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
            items.forEach((b, i) => b.classList.toggle("active", i === tagPick));
        });
        input.addEventListener("themeModEnter", (event) => {
            if (!tagList.hidden) {
                event.stopImmediatePropagation();   /* Enter picks the name, doesn't send */
                pickTag(tagList.children[tagPick]?.dataset.name);
            }
        });
        input.addEventListener("themeModEscape", (event) => {
            if (!tagList.hidden) {
                event.stopImmediatePropagation();   /* first Escape just closes the list */
                closeTags();
            }
        });

        input.addEventListener("themeModEnter", send);
        input.addEventListener("themeModEscape", () => input.blur());
        cnStack.querySelector(".fmCnSend").addEventListener("click", send);

        cnStack.querySelector(".fmCnTabs").addEventListener("click", (event) => {
            const tab = event.target.closest("[data-cn-tab]")?.dataset.cnTab;
            event.target.closest("button")?.blur();   /* a clicked tab shouldn't hold the box open */

            if (tab === "public") cnSetTarget("#public");
            if (tab === "staff") cnSetTarget("#staff");
            if (tab === "pm") {
                const pms = cnPmChannels();
                cnSetTarget(pms.includes(cnLastPm) ? cnLastPm : (pms[0] || "@"));
            }
        });

        cnStack.querySelector(".fmCnPeople").addEventListener("click", (event) => {
            const chip = event.target.closest("[data-cn-chip]");

            if (!chip) {
                return;
            }

            if (chip.dataset.cnChip === "more") {
                cnOpenChat(null);
                return;
            }

            cnSetTarget(chip.dataset.cnChip);
            input.focus();
        });

        cnStack.querySelector(".fmCnPill").addEventListener("click", () => {
            const collapsed = !cnStack.classList.contains("fmCnCollapsed");
            cnStack.classList.toggle("fmCnCollapsed", collapsed);
            localStorage.setItem(CN_LS.hidden, String(collapsed));

            if (!collapsed) {
                cnUnread = 0;
                cnShowPending(cnViewKey(cnTarget.kind, cnTarget.channel), 0);   /* what came in while hidden */
            }

            cnUpdatePill();
        });

        cnStack.addEventListener("mouseenter", cnOpenControls);

        /* Back on FlockMod's tab: fill in any name colors that were missing */
        document.addEventListener("visibilitychange", () => {
            if (document.hidden || !cnStack) return;
            setTimeout(() => cnStack.querySelectorAll(".fmCnCard:not([data-rank]):not([data-plain])").forEach(cnPaintName), 300);
        });

        /* Close to the top: load the earlier ones before you get there,
           so they're already in place as you keep scrolling */
        const cnList = cnStack.querySelector(".fmCnList");
        let nearTopAt = 0;
        cnList.addEventListener("scroll", () => {
            if (cnList.scrollTop > 160 || !cnStack.classList.contains("fmCnOpen") || Date.now() - nearTopAt < 250) return;
            nearTopAt = Date.now();
            cnLoadEarlier();
        }, { passive: true });

        cnStack.addEventListener("wheel", (event) => {
            const list = cnStack.querySelector(".fmCnList");
            if (event.deltaY >= 0 || list.scrollTop > 0) return;
            if (!event.target.closest(".fmCnList, .fmCnTabs, .fmCnPill")) return;
            cnWheelUp();
        }, { passive: true });
        document.documentElement.addEventListener("mouseleave", () => cnCloseSoon());

        /* Width: drag the pink grip on the edge facing the canvas */
        const grip = cnStack.querySelector(".fmCnGrip");
        grip.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            grip.setPointerCapture(event.pointerId);
            const x0 = event.clientX;
            const w0 = cnStack.offsetWidth;
            const dir = cnStack.classList.contains("fmCnLeft") ? 1 : -1;

            const move = (e) => {
                cnStack.style.width = `${Math.max(180, Math.min(480, w0 + (e.clientX - x0) * dir))}px`;
            };
            const up = () => {
                grip.removeEventListener("pointermove", move);
                grip.removeEventListener("pointerup", up);
                localStorage.setItem(CN_LS.width, String(cnStack.offsetWidth));
            };

            grip.addEventListener("pointermove", move);
            grip.addEventListener("pointerup", up);
        });

        cnRenderControls();
    }

    function cnLabel(channel) {
        const kind = cnKindOf(channel);
        if (kind === "pm") return "PM";
        if (kind === "staff") return "Staff";
        return channel === "#public" ? "Public" : channel;
    }

    function cnNote(text) {
        const note = cnStack?.querySelector(".fmCnNote");

        if (!note) {
            return;
        }

        note.textContent = text;
        clearTimeout(note._t);
        note._t = setTimeout(() => { note.textContent = ""; }, 4000);
    }

    /* Public, staff and each PM are kept apart: the cards show only the
       chat you picked in the tabs. Anything else gets a dot instead. */
    function cnViewKey(kind, channel) {
        return kind === "pm" ? channel : kind;
    }

    function cnCardView(m) {
        const channel = m.channel || (m.key.startsWith("you|") ? m.key.slice(4) : "");
        return cnViewKey(m.kind, channel || m.key);
    }

    function cnApplyView() {
        const view = cnViewKey(cnTarget.kind, cnTarget.channel);
        cnViewUnread.delete(view);

        if (cnStack._view === view) {
            return;
        }

        const first = cnStack._view === undefined;
        cnStack._view = view;
        const list = cnStack.querySelector(".fmCnList");

        /* Switching chats: the cards fade out together, swap, and fade back
           in (opacity only, about 0.3s), instead of sliding past each other */
        const swap = () => {
            list._swapT = 0;
            list.querySelectorAll(":scope > .fmCnCard").forEach((card) => {
                if (!card.dataset.sample) {
                    clearTimeout(card._t);
                    card.remove();
                }
            });
            if (!cnStack.classList.contains("fmCnCollapsed")) {
                cnShowPending(cnStack._view);
            }
            list.scrollTop = list.scrollHeight;
            list.classList.remove("fmCnSwapOut");
        };

        clearTimeout(list._swapT);
        const animate = !first && document.documentElement.classList.contains("fmAnimMenu") && list.children.length;
        if (animate) {
            list.classList.add("fmCnSwapOut");
            list._swapT = setTimeout(swap, 120);
        } else {
            swap();
        }
    }

    let cnLastPm = "";   /* the PM you looked at last: the PM tab goes back there */

    function cnSetTarget(channel) {
        cnTarget = { kind: cnKindOf(channel), channel };
        if (cnTarget.kind === "pm" && channel !== "@") cnLastPm = channel;
        cnRenderControls();
    }

    function cnRenderControls() {
        if (!cnStack) {
            return;
        }

        const pms = cnPmChannels();
        const tabs = cnStack.querySelector(".fmCnTabs");
        tabs.querySelector('[data-cn-tab="staff"]').hidden = !cnCanUseStaff();
        tabs.querySelector('[data-cn-tab="pm"]').hidden = !pms.length;

        if (cnTarget.kind === "staff" && !cnCanUseStaff()) cnTarget = { kind: "public", channel: "#public" };
        if (cnTarget.kind === "pm" && !pms.includes(cnTarget.channel)) {
            cnTarget = pms.length ? { kind: "pm", channel: pms[0] } : { kind: "public", channel: "#public" };
        }

        cnApplyView();

        /* Only Public to pick from: no need for the tabs */
        tabs.hidden = tabs.querySelectorAll("[data-cn-tab]:not([hidden])").length < 2 && !cnViewUnread.size;

        tabs.querySelectorAll("[data-cn-tab]").forEach((b) => {
            const kind = b.dataset.cnTab;
            const unread = kind === "pm"
                ? [...cnViewUnread].some((v) => v.startsWith("@"))
                : cnViewUnread.has(kind);
            b.classList.toggle("on", kind === cnTarget.kind);
            b.querySelector(".fmCnDot")?.remove();
            if (unread) b.insertAdjacentHTML("beforeend", '<span class="fmCnDot"></span>');
        });
        cnStack.dataset.cnTarget = cnTarget.kind;

        const people = cnStack.querySelector(".fmCnPeople");
        people.textContent = "";

        if (cnTarget.kind === "pm") {
            pms.slice(0, CN_MAX_CHIPS).forEach((channel) => {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.dataset.cnChip = channel;
                chip.className = channel === cnTarget.channel ? "on" : "";
                chip.textContent = channel.slice(1);

                if ((cnViewUnread.has(channel) || cnHasUnread(channel)) && channel !== cnTarget.channel) {
                    chip.insertAdjacentHTML("beforeend", '<span class="fmCnDot"></span>');
                }

                people.appendChild(chip);
            });

            if (pms.length > CN_MAX_CHIPS) {
                const more = document.createElement("button");
                more.type = "button";
                more.dataset.cnChip = "more";
                more.className = "fmCnMore";
                more.title = "Open all PMs in FlockMod's chat";
                more.textContent = `+${pms.length - CN_MAX_CHIPS}`;
                people.appendChild(more);
            }
        }

        cnStack.querySelector(".fmCnInput").placeholder =
            cnTarget.kind === "pm" ? `Message ${cnTarget.channel.slice(1)}…` : `Reply in ${cnLabel(cnTarget.channel)}…`;
    }

    function cnUpdatePill() {
        if (!cnStack) {
            return;
        }

        const collapsed = cnStack.classList.contains("fmCnCollapsed");
        cnStack.querySelector(".fmCnPillText").textContent = collapsed ? "Show chat" : "Hide chat";
        const badge = cnStack.querySelector(".fmCnBadge");
        badge.textContent = cnUnread > 99 ? "99+" : String(cnUnread);
        badge.hidden = !(collapsed && cnUnread > 0);
    }

    /* ---------- Reply box open / close ----------
       Opening the reply box pushes the cards up. Using plain :hover, the
       card then slid out from under the mouse, the box closed, the cards
       dropped back and it all flickered. Now it opens on hover and stays
       open until the mouse leaves the whole area (cards + box) for a
       moment. The pointer check only runs while open, once per frame. */
    let cnCloseT = 0;
    let cnMoveRaf = 0;
    let cnLastPt = null;

    function cnInZone(x, y) {
        if (!cnStack) return false;
        const pad = 10;
        const list = cnStack.querySelector(".fmCnList").getBoundingClientRect();
        const s = cnStack.getBoundingClientRect();
        const top = list.height ? list.top : cnStack.querySelector(".fmCnExtra").getBoundingClientRect().top;
        return x >= s.left - pad && x <= s.right + pad && y >= top - pad && y <= s.bottom + pad;
    }

    function cnOnMove(event) {
        cnLastPt = event;
        if (cnMoveRaf) return;
        cnMoveRaf = requestAnimationFrame(() => {
            cnMoveRaf = 0;
            if (cnInZone(cnLastPt.clientX, cnLastPt.clientY)) {
                clearTimeout(cnCloseT);
                cnCloseT = 0;
            } else {
                cnCloseSoon();
            }
        });
    }

    /* Focus in the reply box (not just a tab you clicked) */
    function cnTyping() {
        return Boolean(cnStack?.querySelector(".fmCnExtra")?.contains(document.activeElement));
    }

    /* While the cards are open, a scroll that lands in the gaps between
       them (or just beside a short bubble) scrolls the cards instead of
       zooming the canvas. Only the scroll wheel: clicks and drawing still
       go to the canvas. Ctrl+wheel (browser zoom) is left alone. */
    let cnWheelUpAt = 0;

    function cnWheelUp() {
        if (Date.now() - cnWheelUpAt < 200) return;
        cnWheelUpAt = Date.now();
        cnLoadEarlier();
    }

    function cnWheelCatch(event) {
        if (event.ctrlKey || !cnStack?.classList.contains("fmCnOpen") || cnStack.contains(event.target)) return;
        if (!cnInZone(event.clientX, event.clientY)) return;

        event.preventDefault();
        event.stopPropagation();

        const list = cnStack.querySelector(".fmCnList");
        const dy = event.deltaMode === 1 ? event.deltaY * 16
            : event.deltaMode === 2 ? event.deltaY * list.clientHeight
            : event.deltaY;
        list.scrollTop += dy;
        if (dy < 0 && list.scrollTop <= 0) cnWheelUp();
    }

    function cnOpenControls() {
        if (!cnStack) return;
        clearTimeout(cnCloseT);
        cnCloseT = 0;
        if (cnStack.classList.contains("fmCnOpen")) return;
        cnRenderControls();
        cnStack.classList.add("fmCnOpen");
        document.addEventListener("pointermove", cnOnMove, { passive: true });
        window.addEventListener("wheel", cnWheelCatch, { capture: true, passive: false });
    }

    function cnCloseSoon() {
        if (!cnStack || cnCloseT || !cnStack.classList.contains("fmCnOpen")) return;
        cnCloseT = setTimeout(() => {
            cnCloseT = 0;
            if (cnTyping()) return;   /* typing: :focus-within keeps it */
            cnStack.classList.remove("fmCnOpen");
            document.removeEventListener("pointermove", cnOnMove);
            window.removeEventListener("wheel", cnWheelCatch, { capture: true });

            /* Back to the newest few once you leave (scrolled-back history goes) */
            const list = cnStack.querySelector(".fmCnList");
            const cards = [...list.children].filter((c) => !c.classList.contains("fmCnOut"));
            cards.slice(0, Math.max(0, cards.length - CN_MAX_CARDS)).forEach((c) => {
                clearTimeout(c._t);
                c.classList.add("fmCnOut");
                setTimeout(() => c.remove(), 400);
            });
            list.scrollTop = list.scrollHeight;
        }, 350);
    }

    function cnFadeLater(card) {
        clearTimeout(card._t);

        const fade = () => {
            /* hovering anywhere on the cards keeps them all, so nothing jumps under the mouse */
            if (card.matches(":hover") || cnStack.classList.contains("fmCnOpen") || cnTyping()) {
                card._t = setTimeout(fade, 1500);
                return;
            }

            card.classList.add("fmCnOut");
            setTimeout(() => card.remove(), 400);
        };

        card._t = setTimeout(fade, liveCn.stay * 1000);
    }

    /* m: { key, kind, user, color, where, text, mention, own, channel } */
    /* ---------- Message content: text, links, images, emoji ----------
       Built fresh from FlockMod's message (never copied as HTML), so only
       plain text, http(s) links and pictures come through. */
    const CN_URL = /\bhttps?:\/\/[^\s<>"']+/gi;

    function cnSafeUrl(url) {
        try {
            const u = new URL(url, location.href);
            return /^https?:$/.test(u.protocol) ? u.href : "";
        } catch (e) {
            return "";
        }
    }

    function cnLink(href, label) {
        const a = document.createElement("a");
        a.className = "fmCnLink";
        a.href = href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = label;
        a.addEventListener("click", (event) => event.stopPropagation());
        return a;
    }

    /* Plain text with any web addresses turned into links */
    function cnTagify(text, out) {
        let names = null;
        let at = 0;
        text.replace(/@([^\s@]{1,40})/g, (whole, raw, index) => {
            names = names || new Set([...readUserRows().keys(), getMyName()].map((n) => n.toLowerCase()));
            const name = raw.replace(/[.,!?:;)]+$/, "");
            if (!names.has(name.toLowerCase())) return whole;
            if (index > at) out.append(text.slice(at, index));
            const tag = document.createElement("span");
            tag.className = "fmCnTag";
            tag.textContent = `@${name}`;
            out.append(tag);
            at = index + name.length + 1;
            return whole;
        });
        if (at < text.length) out.append(text.slice(at));
    }

    function cnLinkify(text, out) {
        let at = 0;
        text.replace(CN_URL, (url, index) => {
            const clean = url.replace(/[.,!?)]+$/, "");
            const href = cnSafeUrl(clean);
            if (index > at) cnTagify(text.slice(at, index), out);
            out.append(href ? cnLink(href, clean) : clean);
            at = index + clean.length;
            return url;
        });
        if (at < text.length) cnTagify(text.slice(at), out);
    }

    /* Opens a picture in FlockMod's own Image Viewer. FlockMod opens it when
       a ".chatDataUri" picture inside its chat window is clicked (it reads
       the picture's src), and that works even while the chat is closed. So
       a hidden copy is clicked there for a moment. Only your screen. */
    function cnOpenInViewer(url) {
        const chat = document.getElementById("chatMessages");
        const host = chat && cnChatDialog()?.contains(chat) ? chat.parentElement : null;

        if (!host || !url) {
            return false;
        }

        const img = document.createElement("img");
        img.className = "chatDataUri";
        img.src = url;
        img.alt = "";
        img.style.display = "none";
        host.appendChild(img);
        img.click();
        img.remove();
        return true;
    }

    function cnRich(src, out) {
        src.childNodes.forEach((node) => {
            if (node.nodeType === 3) {
                cnLinkify(node.textContent, out);
                return;
            }
            if (node.nodeType !== 1 || node.matches(".msgTime, .msgUsername, .fmBubDeco, script, style")) {
                return;
            }
            if (node.matches(".chatTag")) {
                const tag = document.createElement("span");
                tag.className = "fmCnTag" + (node.classList.contains("chatTagUnknown") ? " fmCnTagUnknown" : "");
                tag.textContent = node.textContent;
                out.append(tag);
                return;
            }
            if (node.matches(".chatEmoji")) {
                const span = document.createElement("span");
                span.className = "fmCnChatEmoji";
                span.textContent = node.textContent;
                if (node.isConnected) cnEmojiFont(node);
                out.append(span);
                return;
            }
            if (node.tagName === "IMG" && node.classList.contains("flagIcon")) {
                const flag = document.createElement("img");
                flag.className = "fmCnFlag";
                flag.src = node.currentSrc || node.src || "";
                flag.alt = node.alt || "";
                flag.title = node.alt || "";
                if (/^https?:/i.test(flag.src)) out.append(flag);
                return;
            }
            if (node.tagName === "I" && /\bfa-[a-z0-9-]+/.test(node.className)) {
                const icon = document.createElement("i");
                icon.className = node.className.split(/\s+/).filter((c) => /^(fas|far|fab|fa|fa-[a-z0-9-]+)$/.test(c)).join(" ");
                out.append(icon);
                return;
            }
            if (node.tagName === "BR") {
                out.append(" ");
            } else if (node.tagName === "IMG") {
                const url = node.currentSrc || node.src || "";
                const ok = /^(https?:|data:image\/|blob:)/i.test(url);
                if (!ok) return;
                const img = document.createElement("img");
                const small = /emoji|emote|smiley/i.test(node.className + " " + url) ||
                    (node.naturalHeight && node.naturalHeight <= 40);
                img.className = small ? "fmCnEmoji" : "fmCnImg";
                img.src = url;
                img.alt = node.alt || "";
                img.loading = "lazy";
                img.draggable = false;
                if (!small) {
                    const href = cnSafeUrl(node.closest("a")?.href || url);
                    img.title = "Open picture";
                    img.addEventListener("click", (event) => {
                        event.stopPropagation();
                        if (!cnOpenInViewer(url) && href) {
                            window.open(href, "_blank", "noopener");
                        }
                    });
                }
                out.append(img);
            } else if (node.tagName === "A" && cnSafeUrl(node.getAttribute("href") || "")) {
                if (node.querySelector("img")) {
                    cnRich(node, out);   /* a linked picture: show the picture */
                } else {
                    out.append(cnLink(cnSafeUrl(node.getAttribute("href")), (node.textContent || "").trim() || node.href));
                }
            } else {
                cnRich(node, out);
            }
        });
        return out;
    }

    /* Text selected inside the cards (for copying) */
    function cnHasSelection() {
        const sel = window.getSelection();
        return Boolean(cnStack && sel && !sel.isCollapsed && sel.toString().trim() &&
            cnStack.contains(sel.anchorNode) && cnStack.contains(sel.focusNode));
    }

    /* ---------- Times ---------- */
    function cnClock() {
        const d = new Date();
        return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    }

    /* FlockMod only prints the time on the first line of a group; every
       line carries it in data-timestamp */
    function cnTimeOf(lines, block) {
        const stamps = lines.map((l) => l?.querySelector?.(".msgTime")?.dataset.timestamp).filter(Boolean);
        return stamps.pop() || block?.querySelector(".msgTime[data-timestamp]")?.dataset.timestamp || "";
    }

    /* ---------- Names: rank color + troll flag, like in chat ---------- */
    const CN_RANK = /^rank[A-Z]{2}$/;

    function cnRankOf(el) {
        return el ? [...el.classList].find((c) => CN_RANK.test(c)) || "" : "";
    }

    /* Ranks we've seen this session, for when FlockMod hasn't drawn the
       message yet (its tab in the background) or the person has left */
    const cnRankCache = new Map();

    /* Their rank from their latest chat message, else the user list, else
       the last one we saw. The user list row is matched by its name
       attribute, since the cell also holds their status ("away"...). */
    function cnRankFor(user) {
        if (!user) return "";
        const blocks = [...document.querySelectorAll("#chatMessages .chatBlock[data-username]")]
            .filter((b) => b.dataset.username === user);
        let rank = cnRankOf(blocks.pop()?.querySelector(".msgUsername"));
        if (!rank) {
            const row = document.querySelector(`#sidebar tr[name="${CSS.escape(user)}"]`);
            rank = cnRankOf(row?.querySelector('td[class*="rank"]'));
        }
        if (!rank) {
            const cell = [...document.querySelectorAll('#sidebar td[class*="rank"]')].find((td) =>
                (td.firstChild?.nodeType === 3 ? td.firstChild.textContent : td.textContent).trim() === user);
            rank = cnRankOf(cell);
        }
        if (rank) {
            cnRankCache.set(user, rank);
            return rank;
        }
        return cnRankCache.get(user) || "";
    }

    function cnPaintName(card) {
        const nameEl = card.querySelector(".fmCnName");
        const user = card.dataset.user;
        if (!nameEl || !user || card.dataset.plain) return;

        const rank = card.dataset.rank || cnRankFor(user);
        if (rank) {
            card.dataset.rank = rank;
            cnRankCache.set(user, rank);
        }
        [...nameEl.classList].filter((c) => CN_RANK.test(c)).forEach((c) => nameEl.classList.remove(c));
        if (rank) nameEl.classList.add(rank);

        let flagged = false;
        try { flagged = trollFlagged.has(user); } catch (e) { /* not ready yet */ }
        nameEl.classList.toggle("fmTrollName", flagged);
    }

    /* After someone is flagged/unflagged in the troll detector */
    function cnRepaintNames() {
        cnStack?.querySelectorAll(".fmCnCard").forEach(cnPaintName);
    }

    const CN_MAX_READING = 200;   /* cards kept while you're scrolled back */

    function cnTopVisibleCard(list) {
        const top = list.getBoundingClientRect().top;
        return [...list.children].find((c) => c.getBoundingClientRect().bottom > top) || null;
    }

    function cnAddCard(m) {
        if (!cnStack) {
            return;
        }

        const view = cnCardView(m);
        const otherView = !m.sample && view !== cnViewKey(cnTarget.kind, cnTarget.channel);

        const entry = m.sample ? null : (m.replay ? m : cnRemember(view, m));

        if (otherView && !m.own && !m.event) {
            cnViewUnread.add(view);
            cnKeepPending(view);
            cnRenderControls();
            setTimeout(cnRenderControls, 600);   /* a new PM's chat tab shows up a moment later */
        }

        if (cnStack.classList.contains("fmCnCollapsed")) {
            if (!m.own && !m.event) {
                cnUnread++;
                cnUpdatePill();
                if (!otherView && !m.sample) cnKeepPending(view);
            }
            return;
        }

        if (otherView) {
            return;   /* not the chat you're looking at: just the dot */
        }

        const list = cnStack.querySelector(".fmCnList");

        if (list._swapT && !m.replay && !m.sample) {
            cnKeepPending(view);   /* mid-switch: it shows with the others in a moment */
            return;
        }
        const atBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 16;
        /* Scrolled back reading: whatever card is at the top stays exactly where it is */
        const reading = !atBottom && !m.prepend && cnStack.classList.contains("fmCnOpen");
        const anchor = reading ? cnTopVisibleCard(list) : null;
        const anchorTop = anchor ? anchor.getBoundingClientRect().top : 0;
        /* One card per message everywhere (PMs too), like FlockMod's chat */
        let card = null;

        {
            card = document.createElement("div");
            card.className = `fmCnCard fmCn-${m.kind}${m.own ? " fmCnOwn" : ""}${m.event ? " fmCnEvent" : ""}${m.noAnim ? " fmCnNoAnim" : ""}${m.earlier ? " fmCnEarlier" : ""}`;
            card.dataset.key = m.key;
            card.dataset.view = view;
            if (entry) card.dataset.mid = String(entry.id);
            if (m.sample) card.dataset.sample = "1";
            card.innerHTML = '<div class="fmCnHead"><span class="fmCnName"></span><span class="fmCnWhere"></span><span class="fmCnCount" hidden></span><span class="fmCnTime"></span></div><div class="fmCnText"></div>';
            card.querySelector(".fmCnName").textContent = m.user;
            card.querySelector(".fmCnWhere").textContent = m.where;
            card.dataset.user = m.user;

            if (m.color) {
                card.querySelector(".fmCnName").style.color = m.color;
            }

            /* Real people: their rank color (and red if flagged as a troll) */
            if (m.own || m.color || !m.channel) {
                card.dataset.plain = "1";
            } else {
                if (m.rank) card.dataset.rank = m.rank;
                cnPaintName(card);
                /* the chat copy lands a moment later (longer while FlockMod's tab is in the background) */
                [400, 1500, 4000].forEach((ms) => setTimeout(() => {
                    if (!card.dataset.rank && card.isConnected) cnPaintName(card);
                }, ms));
            }

            card.addEventListener("click", (event) => {
                if (m.own || m.event || !m.channel || cnHasSelection()) {
                    return;   /* you were selecting text to copy */
                }

                const input = cnStack.querySelector(".fmCnInput");
                cnSetTarget(m.channel);

                /* Public/staff: start the reply with @name */
                if (m.kind !== "pm" && event.target.closest(".fmCnName") && !input.value) {
                    input.value = `@${m.user} `;
                }

                input.focus();
            });
        }

        /* Each message gets its own line; the last few stay readable */
        const box = card.querySelector(".fmCnText");
        const line = document.createElement("div");
        line.className = "fmCnLine";
        if (m.srcs && m.srcs.length) {
            m.srcs.forEach((src, i) => {
                if (i) line.append(" ");
                cnRich(src, line);
            });
        }
        if (!line.textContent.trim() && !line.querySelector("img")) {
            line.textContent = "";
            cnLinkify(m.text, line);
        }
        box.appendChild(line);

        while (box.children.length > CN_MAX_LINES) {
            box.firstElementChild.remove();
        }

        /* Time: FlockMod's own timestamp for the message (hover a line in
           a PM card to see each one's time) */
        /* Mentions of you: that line (and the card) light up in your
           Chat Highlight color, the same as in FlockMod's chat */
        line.classList.toggle("fmCnHl", Boolean(m.mention));
        card.classList.toggle("fmCnMention", Boolean(box.querySelector(".fmCnHl")));

        /* Interface > Chat Bubbles: your card is the bubble, with the style's decoration */
        if (m.own) {
            try { decorateBubbleText(card, bubbleDecoSig()); } catch (err) { /* bubbles not ready yet */ }
        }

        const time = m.time || cnClock();
        card.querySelector(".fmCnTime").textContent = time;
        line.title = time;

        /* Mod actions: highlight the action word and the mod's name */
        if (m.event) {
            cnMarkModEvent(line);
        }

        /* Events: one small gray line with the time in front */
        if (m.event) {
            const t = document.createElement("span");
            t.className = "fmCnEvTime";
            t.textContent = time;
            line.prepend(t, " ");
        }

        if (m.prepend) {
            list.insertBefore(card, list.firstChild);
        } else {
            list.appendChild(card);
        }

        /* Too many: drop the oldest. While you're hovering (maybe scrolled
           back) the list can hold the whole history instead. */
        /* While you're scrolled back, nothing is dropped from the top (that's
           what you're reading); it catches up once you're back at the bottom
           or move away from the cards */
        const max = reading ? CN_MAX_READING : cnStack.classList.contains("fmCnOpen") ? CN_MAX_RECENT : CN_MAX_CARDS;
        while (list.children.length > max) {
            (m.prepend ? list.lastElementChild : list.firstElementChild).remove();
        }

        if (anchor && anchor.isConnected) {
            list.scrollTop += anchor.getBoundingClientRect().top - anchorTop;
        }

        if (!m.prepend && (atBottom || !cnStack.classList.contains("fmCnOpen"))) {
            list.scrollTop = list.scrollHeight;
        }

        cnFadeLater(card);
    }

    /* ---------- Mod actions in events ---------- */
    /* "ioj has been muted by cntrct." -> "muted" stands out and "cntrct"
       gets their rank color (from the user list, like the card names) */
    const CN_MOD_WORD = /\b(un)?(muted|banned|silenced|kicked)\b/i;
    const CN_MOD_BY = /\bby\s+([^\s]+?)([.!,]*)\s*$/i;

    function cnMarkModEvent(line) {
        if (!CN_MOD_WORD.test(line.textContent || "")) return;

        const texts = [];
        const walk = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
        while (walk.nextNode()) {
            if (!walk.currentNode.parentElement.closest("a, .fmCnTag")) texts.push(walk.currentNode);
        }

        texts.forEach((node) => {
            const frag = document.createDocumentFragment();
            let rest = node.textContent;
            let changed = false;

            /* the mod's name: "by <name>" at the end */
            let tail = null;
            const by = rest.match(CN_MOD_BY);
            if (by) {
                const nameAt = by.index + by[0].indexOf(by[1], 2);
                tail = { name: by[1], after: rest.slice(nameAt + by[1].length) };
                rest = rest.slice(0, nameAt);
            }

            /* the action words */
            const re = new RegExp(CN_MOD_WORD.source, "gi");
            let at = 0, hit;
            while ((hit = re.exec(rest))) {
                if (hit.index > at) frag.append(rest.slice(at, hit.index));
                const word = document.createElement("span");
                word.className = "fmCnModWord" + (hit[1] ? " fmCnModUndo" : "");
                word.textContent = hit[0];
                frag.append(word);
                at = hit.index + hit[0].length;
                changed = true;
            }
            if (at < rest.length) frag.append(rest.slice(at));

            if (tail && changed) {
                const name = document.createElement("span");
                name.className = "fmCnModName";
                name.textContent = tail.name;
                cnPaintModName(name);
                frag.append(name, tail.after);
            } else if (tail) {
                frag.append(tail.name, tail.after);
            }

            if (changed) node.replaceWith(frag);
        });
    }

    function cnPaintModName(el, retry = true) {
        const rank = cnRankFor(el.textContent);
        [...el.classList].filter((c) => CN_RANK.test(c)).forEach((c) => el.classList.remove(c));
        if (rank) {
            el.classList.add(rank);
        } else if (retry) {
            setTimeout(() => { if (el.isConnected) cnPaintModName(el, false); }, 1500);
        }
    }

    /* ---------- Reading new messages ---------- */

    function cnReadLine(line) {
        const text = line?.querySelector?.(".msgText") || line;

        if (!text) {
            return "";
        }

        const words = (text.textContent || "").replace(/\s+/g, " ").trim();
        return words || (text.querySelector("img") ? "[image]" : "");
    }

    /* The same message can reach us twice (the chat box and the activity
       bar). Remember what was shown in the last few seconds. */
    const cnShown = new Map();

    /* Your own messages: sent from the cards, or typed in FlockMod's own
       chat window. Both go in that chat's history (so you see what you
       said when you come back); FlockMod's copy of a card message is skipped. */
    const cnSentByCards = new Map();

    function cnSentKey(channel, text) {
        return `${channel}|${String(text).replace(/\s+/g, " ").trim().toLowerCase()}`;
    }

    /* The person you talked to most recently comes first in the PM list */
    function cnTouchPm(channel) {
        if (!channel || !channel.startsWith("@")) return;
        const i = cnRecentPm.indexOf(channel);
        if (i > -1) cnRecentPm.splice(i, 1);
        cnRecentPm.unshift(channel);
    }

    function cnHandleOwnBlock(block, lines) {
        const channel = block.closest(".channelMessages")?.getAttribute("name") || "";
        const text = lines.map(cnReadLine).filter(Boolean).join(" ");
        if (!channel || !text) return;

        const now = Date.now();
        cnSentByCards.forEach((t, k) => { if (now - t > 8000) cnSentByCards.delete(k); });
        const key = cnSentKey(channel, text);
        if (cnSentByCards.has(key)) {
            cnSentByCards.delete(key);   /* already on the cards */
            return;
        }

        if (!liveCn.on || !customizationsEnabled) return;

        const kind = cnKindOf(channel);
        cnTouchPm(channel);
        cnAddCard({
            key: `you|${channel}`,
            kind,
            user: "You",
            where: kind === "pm" ? `→ ${channel.slice(1)}` : `· ${cnLabel(channel)}`,
            time: cnTimeOf(lines, block),
            text,
            srcs: lines.map((l) => l.querySelector?.(".msgText") || l),
            own: true
        });
    }

    function cnAlreadyShown(user, text) {
        const now = Date.now();
        cnShown.forEach((t, k) => { if (now - t > 5000) cnShown.delete(k); });
        const key = `${user.toLowerCase()}|${text.replace(/\s+/g, " ").trim().toLowerCase()}`;
        if (cnShown.has(key)) return true;
        cnShown.set(key, now);
        return false;
    }

    function cnHandleBlock(block, lines) {
        if (block && (block.classList.contains("eventBlock") || block.classList.contains("gmBlock"))) {
            cnHandleEvent(block, lines);
            return;
        }

        if (block && block.classList.contains("messageBlock") && block.dataset.type === "MYMSG") {
            cnHandleOwnBlock(block, lines);
            return;
        }

        if (!block || !block.classList.contains("messageBlock")) {
            return;
        }

        const channel = block.closest(".channelMessages")?.getAttribute("name") || "";
        const text = lines.map(cnReadLine).filter(Boolean).join(" ");

        if (!channel || !text) {
            return;
        }

        const kind = cnKindOf(channel);

        if (kind === "pm") {
            const i = cnRecentPm.indexOf(channel);
            if (i > -1) cnRecentPm.splice(i, 1);
            cnRecentPm.unshift(channel);
        }

        if (!liveCn.on || !customizationsEnabled || (liveCn.closedOnly && cnChatIsOpen())) {
            return;
        }

        const nameEl = block.querySelector(".msgUsername");
        const user = block.dataset.username || nameEl?.textContent?.trim() || "?";

        if (cnAlreadyShown(user, text)) {
            return;
        }

        cnAddCard({
            key: kind === "pm" ? channel : `${channel}|${user}`,
            kind,
            channel,
            user,
            color: "",
            time: cnTimeOf(lines, block),
            rank: cnRankOf(nameEl),
            where: `· ${cnLabel(channel)}`,
            text,
            srcs: lines.map((l) => l.querySelector?.(".msgText") || l),
            mention: isMention(text)
        });

        if (cnStack?.classList.contains("fmCnOpen")) {
            cnRenderControls();
        }
    }

    /* Events (joins, leaves with IP, mutes, kicks...) and global messages:
       small gray lines in the Public cards. FlockMod also copies a user's
       events into their PM, so only the public copy is used. No dots. */
    function cnHandleEvent(block, lines) {
        const channel = block.closest(".channelMessages")?.getAttribute("name") || "";
        const text = lines.map(cnReadLine).filter(Boolean).join(" ");

        if (cnKindOf(channel) !== "public" || !text) {
            return;
        }
        if (!liveCn.on || !customizationsEnabled || (liveCn.closedOnly && cnChatIsOpen())) {
            return;
        }

        cnAddCard({
            key: `event|${text}`,
            kind: "public",
            event: true,
            channel: "",
            user: "",
            color: "",
            time: cnTimeOf(lines, block),
            where: "",
            text,
            srcs: lines.map((l) => l.querySelector?.(".msgText") || l)
        });
    }

    /* Every message line we've already looked at. Anything in the chat
       that isn't in here is new. Seeded with what's there on attach, so
       old history never pops up. */
    let cnSeen = new WeakSet();
    let cnScanTimer = 0;

    function cnDebug(...args) {
        if (localStorage.getItem("flockmodChatNotifDebug") === "1") {
            console.log("[FlockTheme chat notif]", ...args);
        }
    }

    function cnLinesIn(root) {
        return root ? [...root.querySelectorAll(".chatBlock.messageBlock .msgLine, .chatBlock.eventBlock .msgLine, .chatBlock.gmBlock .msgLine")] : [];
    }

    function cnScan() {
        cnScanTimer = 0;
        const fresh = cnLinesIn(cnWatch.el).filter((line) => !cnSeen.has(line));

        if (!fresh.length) {
            return;
        }

        /* A channel being loaded or redrawn adds lots at once: that's history */
        if (fresh.length > 6) {
            fresh.forEach((line) => cnSeen.add(line));
            cnDebug("skipped a batch of", fresh.length, "lines (history)");
            return;
        }

        /* Group new lines by their message block */
        const byBlock = new Map();

        fresh.forEach((line) => {
            if (!cnReadLine(line)) {
                return;   /* still empty: FlockMod fills it in a moment */
            }
            cnSeen.add(line);
            const block = line.closest(".chatBlock");
            if (block) {
                if (!byBlock.has(block)) byBlock.set(block, []);
                byBlock.get(block).push(line);
            }
        });

        byBlock.forEach((lines, block) => {
            cnDebug("new message", block.dataset.type, block.dataset.username,
                block.closest(".channelMessages")?.getAttribute("name"), cnReadLine(lines[0]));
            cnHandleBlock(block, lines);
        });
    }

    /* Switching rooms: FlockMod empties every chat channel and closes the
       PMs. The cards, the dots and the remembered messages from the old
       room go too, so nothing from there shows up in the new one. */
    function cnChatHasMessages() {
        return Boolean(cnWatch.el?.querySelector(".channelMessages .chatBlock"));
    }

    function cnRoomReset() {
        cnDebug("room changed: clearing cards and history");
        cnRecent.clear();
        cnMissed.clear();
        cnViewUnread.clear();
        cnShown.clear();
        cnRecentPm.length = 0;
        cnSentByCards.clear();
        cnRankCache.clear();
        cnLastPm = "";
        cnUnread = 0;
        cnTarget = { kind: "public", channel: "#public" };
        cnWatch.armedAt = Date.now() + 1500;   /* the new room's old messages aren't new */
        cnBar.armedAt = Date.now() + 1500;

        if (cnStack) {
            cnStack.querySelectorAll(".fmCnList > .fmCnCard").forEach((card) => {
                clearTimeout(card._t);
                card.remove();
            });
            cnStack._view = "public";
            cnUpdatePill();
            cnRenderControls();
        }
    }

    function cnHandleMutations() {
        const has = cnChatHasMessages();
        if (cnWatch.hadMessages && !has) {
            cnRoomReset();
        }
        cnWatch.hadMessages = has;

        if (Date.now() < cnWatch.armedAt) {
            /* the chat was just (re)built: count all of it as already seen */
            cnLinesIn(cnWatch.el).forEach((line) => cnSeen.add(line));
            return;
        }

        if (!cnScanTimer) {
            cnScanTimer = setTimeout(cnScan, 120);
        }
    }

    /* From the 500ms loop: (re)attach when FlockMod makes or replaces the box */
    function watchChatNotif() {
        const el = document.getElementById("chatMessages");

        if (el === cnWatch.el) {
            return;
        }

        cnWatch.obs?.disconnect();
        cnWatch.el = el;
        cnWatch.obs = null;

        if (!el) {
            return;
        }

        cnSeen = new WeakSet();
        cnLinesIn(el).forEach((line) => cnSeen.add(line));
        cnWatch.hadMessages = cnChatHasMessages();
        cnWatch.armedAt = Date.now() + 1500;
        cnWatch.obs = new MutationObserver(cnHandleMutations);
        cnWatch.obs.observe(el, { childList: true, subtree: true });
        cnDebug("watching #chatMessages,", cnLinesIn(el).length, "old lines");
    }

    /* ---------- The activity bar (#headerTitle) ----------
       With the chat closed, FlockMod doesn't always add messages to the
       chat box, but it always flashes them in the activity bar at the top:
       <div id="headerTitle"><div class="msgCategory msgCategoryPM">..</div>Name: text</div> */
    const cnBar = { el: null, obs: null, last: "" };
    const CN_BAR_KINDS = { PM: "pm", PUBLICROOM: "public", STAFFROOM: "staff" };

    function cnReadBar() {
        const bar = cnBar.el;
        const catEl = bar?.querySelector(".msgCategory");

        if (!catEl) {
            return;
        }

        const catClass = [...catEl.classList].find((c) => c.startsWith("msgCategory") && c !== "msgCategory");

        /* FlockMod has no label for your own messages here (it shows the raw
           "notifications.categories.MYMSG"). Only a look: the text says "You". */
        if (catClass === "msgCategoryMYMSG") {
            const label = catEl.querySelector("[data-i18n]") || catEl;
            if (/^notifications\./.test(label.textContent.trim())) {
                label.textContent = "You";
            }
            return;
        }
        const kind = catClass ? CN_BAR_KINDS[catClass.slice("msgCategory".length)] : null;
        const full = (bar.textContent || "").replace(/\s+/g, " ").trim();
        const label = (catEl.textContent || "").replace(/\s+/g, " ").trim();
        const rest = (label && full.startsWith(label) ? full.slice(label.length) : full).trim();

        if (rest === cnBar.last) {
            return;
        }
        cnBar.last = rest;

        cnDebug("activity bar:", catClass, JSON.stringify(rest), bar.innerHTML.slice(0, 300));

        if (!kind || !rest || Date.now() < cnBar.armedAt) {
            return;   /* events, MOTD, GM, the room link, or the page just loaded */
        }

        /* FlockMod puts the message in .msgLine > .msgText (and the name in
           .msgUsername when there is one). Older layouts: "Name: text". */
        const tidy = (el) => (el?.textContent || "").replace(/\s+/g, " ").trim();
        const nameEl = bar.querySelector(".msgUsername, [data-username]");
        const textEl = bar.querySelector(".msgText");
        let user = tidy(nameEl) || nameEl?.dataset?.username || "";
        let text = textEl ? cnReadLine(textEl) : "";
        let src = textEl ? textEl.cloneNode(true) : null;
        const hasImg = Boolean(textEl?.querySelector("img"));

        if (!user) {
            /* "Name: message" — split the name off (the message may be just a picture) */
            const m = (tidy(textEl) || rest).match(/^([^:\s][^:]{0,39}?)\s*:\s*([\s\S]*)$/);
            if (m && (m[2].trim() || hasImg)) {
                user = m[1].trim();
                text = m[2].trim() || "[image]";
                /* take "Name:" off the copy too */
                const first = src && [...src.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
                if (first && first.textContent.includes(":")) {
                    first.textContent = first.textContent.slice(first.textContent.indexOf(":") + 1).replace(/^\s+/, "");
                } else {
                    src = null;
                }
            } else if (!text) {
                text = rest;
                src = null;
            }
        }

        user = user.replace(/^[@#]/, "").replace(/:$/, "");

        /* "To Name:" / "From Name:" styles, just in case */
        user = user.replace(/^(from|to)\s+/i, "");

        if (!text || Date.now() - lastSentAt < 1500) {
            return;   /* probably your own message */
        }

        const channel = kind === "pm" ? `@${user}` : (kind === "staff" ? "#staff" : "#public");

        if (kind === "pm" && user) {
            const i = cnRecentPm.indexOf(channel);
            if (i > -1) cnRecentPm.splice(i, 1);
            cnRecentPm.unshift(channel);
        }

        if (!liveCn.on || !customizationsEnabled || (liveCn.closedOnly && cnChatIsOpen())) {
            return;
        }

        if (cnAlreadyShown(user || "?", text)) {
            return;
        }

        cnAddCard({
            key: kind === "pm" ? channel : `${channel}|${user}`,
            kind,
            channel,
            user: user || "?",
            color: "",
            where: `· ${cnLabel(channel)}`,
            text,
            time: bar.querySelector(".msgTime")?.dataset.timestamp || "",
            srcs: src ? [src] : [],
            mention: isMention(text)
        });

        if (cnStack?.classList.contains("fmCnOpen")) {
            cnRenderControls();
        }
    }

    function watchChatBar() {
        const el = document.getElementById("headerTitle");

        if (el === cnBar.el) {
            return;
        }

        cnBar.obs?.disconnect();
        cnBar.el = el;
        cnBar.obs = null;

        if (!el) {
            return;
        }

        cnBar.armedAt = Date.now() + 1500;
        cnBar.last = "";
        cnBar.obs = new MutationObserver(() => setTimeout(cnReadBar, 30));
        cnBar.obs.observe(el, { childList: true, subtree: true, characterData: true, attributes: true });
        cnDebug("watching the activity bar");
    }

    /* From the 500ms loop: side away from the sidebar, between the bars */
    function cnPlace() {
        if (!cnStack) {
            return;
        }

        const host = cnHost();
        if (cnStack.parentElement !== host) {
            host.appendChild(cnStack);
        }

        const sample = Date.now() < (cnStack._sampleUntil || 0);
        const hide = !sample && (!liveCn.on || !customizationsEnabled || (liveCn.closedOnly && cnChatIsOpen()));
        cnStack.classList.toggle("fmCnHide", hide);

        if (hide) {
            return;
        }

        const sidebar = document.getElementById("sidebar");
        const r = sidebar ? sidebar.getBoundingClientRect() : null;
        const sidebarOnRight = !r || !r.width || (r.left + r.width / 2) > window.innerWidth / 2;
        const topBar = document.querySelector(".topbarButtons")?.closest("nav");
        const bottomBar = document.getElementById("bottombar");
        const top = Math.round((topBar ? topBar.getBoundingClientRect().bottom : 40) + 10);
        const bottom = Math.round((bottomBar ? window.innerHeight - bottomBar.getBoundingClientRect().top : 40) + 10);
        const left = sidebarOnRight;

        if (cnStack.classList.contains("fmCnLeft") !== left) {
            cnStack.classList.toggle("fmCnLeft", left);
            cnStack.classList.toggle("fmCnRight", !left);
        }

        if (cnStack._pos !== `${top}|${bottom}|${left}`) {
            cnStack._pos = `${top}|${bottom}|${left}`;
            cnStack.style.top = `${top}px`;
            cnStack.style.bottom = `${bottom}px`;
            cnStack.style.left = left ? "10px" : "auto";
            cnStack.style.right = left ? "auto" : "10px";
        }

        /* "Follow my theme": FlockMod's own sidebar colors as the base */
        if (sidebar && !cnStack._native) {
            const cs = getComputedStyle(sidebar);
            const bg = cs.backgroundColor;
            cnStack._native = true;

            if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) {
                cnStack.style.setProperty("--fmcn-native-bg", bg);
            }

            cnStack.style.setProperty("--fmcn-native-text", cs.color);
        }
    }

    function buildChatNotifRowsHTML() {
        const toggle = (id, def) => `
    <label class="themeModToggle" style="margin-right: 10px;">
        <input type="checkbox" id="${id}" data-default="${def}"${def ? " checked" : ""}>
        <span class="themeModToggleTrack">
            <span class="themeModToggleOption themeModToggleOff">OFF</span>
            <span class="themeModToggleOption themeModToggleOn">ON</span>
            <span class="themeModToggleThumb"></span>
        </span>
    </label>`;

        return `
<div class="themeModSubsectionTitle themeModSpacingSubsection">
    Chat Notifications
</div>

<div class="themeModSetting themeModNoDivider">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Chat notifications</div>
        <div class="themeModSettingDescription">
            New messages pop up beside the canvas. The tabs pick which chat you see; a dot means news in another. Hover to reply. Colors: Colors &gt; Chat Notifications.
        </div>
    </div>
    ${toggle("themeModChatNotif", true)}
</div>

<div class="themeModSetting themeModNoDivider">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Only while the chat is closed</div>
        <div class="themeModSettingDescription">Hides them while FlockMod's chat window is open.</div>
    </div>
    ${toggle("themeModChatNotifClosedOnly", true)}
</div>

<div class="themeModSetting themeModNoDivider">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Your cards on the right</div>
        <div class="themeModSettingDescription">With Chat Bubbles on, your messages line up on the right.</div>
    </div>
    ${toggle("themeModChatNotifOwnRight", true)}
</div>

<div class="themeModSetting themeModNoDivider">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Size</div>
        <div class="themeModSettingDescription">Text and card size. Drag the pink edge of the cards to change their width.</div>
    </div>
    <div class="themeModRangeControl">
        <input type="range" id="themeModChatNotifSize" class="themeModRange" min="70" max="150" step="5" value="${CN_DEFAULTS.size}" data-default="${CN_DEFAULTS.size}">
        <span id="themeModChatNotifSizeValue" class="themeModRangeValue">${CN_DEFAULTS.size}%</span>
    </div>
</div>

<div class="themeModSetting themeModNoDivider">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Stay on screen</div>
        <div class="themeModSettingDescription">Seconds before a card fades. Hovering keeps it.</div>
    </div>
    <div class="themeModRangeControl">
        <input type="range" id="themeModChatNotifStay" class="themeModRange" min="3" max="30" step="1" value="${CN_DEFAULTS.stay}" data-default="${CN_DEFAULTS.stay}">
        <span id="themeModChatNotifStayValue" class="themeModRangeValue">${CN_DEFAULTS.stay}s</span>
    </div>
</div>

<div class="themeModSetting themeModNoDivider">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Try it</div>
        <div class="themeModSettingDescription">Shows a sample message.</div>
    </div>
    <button type="button" class="themeModButton themeModChatNotifTest">Show sample</button>
</div>`;
    }

    function setupChatNotif(dialog) {
        const on = dialog.querySelector("#themeModChatNotif");
        const closedOnly = dialog.querySelector("#themeModChatNotifClosedOnly");
        const ownRight = dialog.querySelector("#themeModChatNotifOwnRight");
        const size = dialog.querySelector("#themeModChatNotifSize");
        const stay = dialog.querySelector("#themeModChatNotifStay");

        if (!on || !closedOnly || !ownRight || !size || !stay) {
            return;
        }

        const labels = () => {
            dialog.querySelector("#themeModChatNotifSizeValue").textContent = `${size.value}%`;
            dialog.querySelector("#themeModChatNotifStayValue").textContent = `${stay.value}s`;
        };
        const fill = (st) => {
            on.checked = st.on;
            closedOnly.checked = st.closedOnly;
            ownRight.checked = st.ownRight;
            size.value = String(st.size);
            stay.value = String(st.stay);
            labels();
        };
        const read = () => ({ on: on.checked, closedOnly: closedOnly.checked, ownRight: ownRight.checked, size: Number(size.value), stay: Number(stay.value) });
        const preview = () => {
            labels();
            applyChatNotif(read());
        };

        fill(readSavedChatNotif());
        [on, closedOnly, ownRight].forEach((el) => el.addEventListener("change", preview));
        [size, stay].forEach((el) => el.addEventListener("input", preview));

        dialog.querySelector(".themeModChatNotifTest")?.addEventListener("click", () => {
            if (!on.checked) {
                on.checked = true;
                preview();
            }

            buildCnStack();
            cnStack._sampleUntil = Date.now() + 10000;   /* shows even if the chat is open */
            cnStack.classList.remove("fmCnCollapsed");
            localStorage.setItem(CN_LS.hidden, "false");
            cnUpdatePill();
            cnPlace();
            cnAddCard({ key: "@sample", kind: "pm", user: "Sample", color: "#ffd27a", where: "· PM", text: "Hi! This is how a private message looks.", sample: true });
            cnAddCard({ key: "#sample|Leaf", kind: "public", user: "Sample", color: "#7fc8ff", where: "· Public", text: "And this is a public one.", sample: true });
            cnAddCard({ key: "you|sample", kind: "public", user: "You", where: "· Public", text: "And this is yours.", own: true, sample: true });
        });

        dialog.querySelector(".themeModApplyButton").addEventListener("click", () => {
            const st = read();
            localStorage.setItem(CN_LS.on, String(st.on));
            localStorage.setItem(CN_LS.closedOnly, String(st.closedOnly));
            localStorage.setItem(CN_LS.ownRight, String(st.ownRight));
            localStorage.setItem(CN_LS.size, String(st.size));
            localStorage.setItem(CN_LS.stay, String(st.stay));
        });

        dialog.querySelector(".themeModResetButton").addEventListener("click", () => {
            Object.values(CN_LS).forEach((key) => {
                if (key !== CN_LS.width && key !== CN_LS.hidden) localStorage.removeItem(key);
            });
            fill(readSavedChatNotif());
            preview();
        });

        dialog.querySelector(".closeButton").addEventListener("click", applySavedChatNotif);
    }


    /* =========================================================
       CLOCK + TIME ON FLOCKMOD + BREAK REMINDER (v1.6.3)
       A small clock next to the flower in the bottom bar. Click it
       for how long you've been on FlockMod. Time only counts while
       the FlockMod tab is in front (and, with "Active time only",
       while you've drawn/typed/clicked in the last 2 minutes).
       One tick every 15 seconds; everything stays on this computer.
       ========================================================= */
    const CLOCK_LS = { on: "flockmodClockEnabled", h24: "flockmodClock24h", active: "flockmodClockActiveOnly", brk: "flockmodBreakEvery" };
    const TIME_STATS_LS = "flockmodTimeStats";
    const BREAK_CHOICES = [[0, "Off"], [30, "Every 30 minutes"], [45, "Every 45 minutes"], [60, "Every hour"], [90, "Every 1.5 hours"], [120, "Every 2 hours"]];
    const TIME_TICK_S = 15;
    let liveClock = { on: true, h24: false, active: false, brk: 0 };
    let sessionSecs = 0;
    let breakSecs = 0;
    let breakSnoozeUntil = 0;
    let lastActivityAt = Date.now();
    let hiddenSince = 0;

    function readSavedClock() {
        const brk = Number(localStorage.getItem(CLOCK_LS.brk));
        return {
            on: localStorage.getItem(CLOCK_LS.on) !== "false",
            h24: localStorage.getItem(CLOCK_LS.h24) === "true",
            active: localStorage.getItem(CLOCK_LS.active) === "true",
            brk: BREAK_CHOICES.some(([v]) => v === brk) ? brk : 0
        };
    }

    function applyClock(st) {
        liveClock = st;
        document.documentElement.classList.toggle("fmClockOn", st.on);
        updateClockText();
    }

    function applySavedClock() {
        applyClock(readSavedClock());
    }

    function clockText() {
        const d = new Date();
        let h = d.getHours();
        const m = String(d.getMinutes()).padStart(2, "0");

        if (liveClock.h24) {
            return `${String(h).padStart(2, "0")}:${m}`;
        }

        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        return `${h}:${m} ${ampm}`;
    }

    function updateClockText() {
        const el = document.querySelector(".fmClockButton .fmClockTime");

        if (el) {
            const t = clockText();
            if (el.textContent !== t) el.textContent = t;
        }
    }

    function addClockButton() {
        const bottomBar = document.querySelector("#bottombar > nav > div > ul:nth-child(3)");

        if (!bottomBar || bottomBar.querySelector(".fmClockButton")) {
            return;
        }

        const item = document.createElement("li");
        item.className = "nav-item fmClockItem";
        const button = document.createElement("a");
        button.href = "#";
        button.className = "nav-link fmClockButton";
        button.title = "Time on FlockMod";
        button.innerHTML = '<span class="fmClockTime"></span>';
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();   /* keep FlockMod's own bottom bar handlers out of it */
            toggleTimeCard(button);
        });
        item.appendChild(button);
        /* v1.6.3: on the left of the bottom bar buttons, after FlockMod's
           divider line (so no line sits between the clock and the buttons) */
        const firstButton = [...bottomBar.children].find((li) =>
            !li.matches(".nav-separator") && !li.querySelector(".nav-separator"));
        bottomBar.insertBefore(item, firstButton || null);
        updateClockText();
    }

    /* ---- stats ---- */
    function dayKey(d = new Date()) {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }

    function readTimeStats() {
        try {
            const s = JSON.parse(localStorage.getItem(TIME_STATS_LS) || "{}");
            return { days: s.days && typeof s.days === "object" ? s.days : {}, total: Number(s.total) || 0 };
        } catch (error) {
            return { days: {}, total: 0 };
        }
    }

    function addTrackedTime(secs) {
        const s = readTimeStats();
        const key = dayKey();
        s.days[key] = (Number(s.days[key]) || 0) + secs;
        s.total += secs;

        /* keep two weeks of days */
        const keys = Object.keys(s.days).sort();
        keys.slice(0, Math.max(0, keys.length - 14)).forEach((k) => delete s.days[k]);

        try {
            localStorage.setItem(TIME_STATS_LS, JSON.stringify(s));
        } catch (error) { /* storage full: skip */ }
    }

    function fmtDuration(secs) {
        const m = Math.floor(secs / 60);
        if (m < 1) return "under a minute";
        const h = Math.floor(m / 60);
        return h ? `${h}h ${String(m % 60).padStart(2, "0")}m` : `${m}m`;
    }

    function timeSummary() {
        const s = readTimeStats();
        const today = Number(s.days[dayKey()]) || 0;
        let week = 0;

        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            week += Number(s.days[dayKey(d)]) || 0;
        }

        return { session: sessionSecs, today, week, total: s.total };
    }

    function setupTimeTracking() {
        ["pointerdown", "keydown", "wheel"].forEach((type) => {
            window.addEventListener(type, () => { lastActivityAt = Date.now(); }, { capture: true, passive: true });
        });

        document.addEventListener("visibilitychange", () => {
            hiddenSince = document.hidden ? Date.now() : 0;
        });

        setInterval(() => {
            updateClockText();
            const now = Date.now();

            /* away 5+ minutes (tab hidden or no activity) = you took a break */
            if ((hiddenSince && now - hiddenSince > 5 * 60000) || now - lastActivityAt > 5 * 60000) {
                breakSecs = 0;
            }

            if (document.hidden || !customizationsEnabled) {
                return;
            }

            if (liveClock.active && now - lastActivityAt > 2 * 60000) {
                return;
            }

            sessionSecs += TIME_TICK_S;
            breakSecs += TIME_TICK_S;
            addTrackedTime(TIME_TICK_S);
            refreshTimeCard();

            if (liveClock.brk && breakSecs >= liveClock.brk * 60 && now >= breakSnoozeUntil) {
                showBreakReminder();
            }
        }, TIME_TICK_S * 1000);
    }

    /* ---- the little card above the clock ---- */
    let timeCardToggledAt = 0;

    function toggleTimeCard(button) {
        /* one toggle per click, even if the click arrives twice */
        if (Date.now() - timeCardToggledAt < 300) {
            return;
        }
        timeCardToggledAt = Date.now();

        const old = document.querySelector(".fmTimeCard");

        if (old) {
            old.remove();
            return;
        }

        const card = document.createElement("div");
        card.className = "fmTimeCard";
        card.setAttribute("role", "dialog");
        card.setAttribute("aria-label", "Time on FlockMod");
        document.documentElement.appendChild(card);   /* outside FlockMod's page, so nothing there can hide it */
        refreshTimeCard();

        const r = button.getBoundingClientRect();
        card.style.left = `${Math.max(8, Math.min(window.innerWidth - card.offsetWidth - 8, r.left + r.width / 2 - card.offsetWidth / 2))}px`;
        card.style.top = `${Math.max(8, r.top - card.offsetHeight - 8)}px`;

        const outside = (event) => {
            if (!card.contains(event.target) && !button.contains(event.target)) {
                card.remove();
                window.removeEventListener("pointerdown", outside, true);
            }
        };
        setTimeout(() => window.addEventListener("pointerdown", outside, true), 0);
    }

    function refreshTimeCard() {
        const card = document.querySelector(".fmTimeCard");

        if (!card) {
            return;
        }

        const t = timeSummary();
        const brk = BREAK_CHOICES.find(([v]) => v === liveClock.brk);
        card.innerHTML =
            '<div class="fmTimeTitle"><span class="fmTourFlower" aria-hidden="true"></span>Time on FlockMod</div>' +
            `<div class="fmTimeRow"><span>This session</span><b>${fmtDuration(t.session)}</b></div>` +
            `<div class="fmTimeRow"><span>Today</span><b>${fmtDuration(t.today)}</b></div>` +
            `<div class="fmTimeRow"><span>Last 7 days</span><b>${fmtDuration(t.week)}</b></div>` +
            `<div class="fmTimeRow"><span>All time</span><b>${fmtDuration(t.total)}</b></div>` +
            `<div class="fmTimeNote">${liveClock.active ? "Counting active time only." : "Counting while FlockMod is open in front."} Break reminder: ${brk ? brk[1].toLowerCase() : "off"}.</div>`;
    }

    /* ---- break reminder ---- */
    function showBreakReminder() {
        if (document.querySelector(".fmBreakToast")) {
            return;
        }

        const mins = Math.round(breakSecs / 60);
        const toast = document.createElement("div");
        toast.className = "fmBreakToast";
        toast.setAttribute("role", "status");
        toast.dataset.fm = "break";
        toast.innerHTML =
            '<span class="fmTourFlower" aria-hidden="true"></span>' +
            `<div class="fmBreakText"><b>Time for a little break?</b><br>You've been drawing for ${fmtDuration(mins * 60)}. Stretch, sip some water and rest your eyes.</div>` +
            '<div class="fmBreakButtons"><button type="button" data-break="ok">Thanks!</button><button type="button" data-break="snooze">In 10 min</button></div>';
        document.documentElement.appendChild(toast);

        toast.addEventListener("click", (event) => {
            const b = event.target.closest("[data-break]");
            if (!b) return;
            if (b.dataset.break === "ok") breakSecs = 0;
            else breakSnoozeUntil = Date.now() + 10 * 60000;
            toast.remove();
        });
    }

    /* ---- settings (Interface > Clock & Time) ---- */
    function buildClockRowsHTML() {
        const toggle = (id, def) => `
            <label class="themeModToggle">
                <input type="checkbox" id="${id}" data-default="${def}"${def ? " checked" : ""}>
                <span class="themeModToggleTrack">
                    <span class="themeModToggleOption themeModToggleOff">OFF</span>
                    <span class="themeModToggleOption themeModToggleOn">ON</span>
                    <span class="themeModToggleThumb"></span>
                </span>
            </label>`;
        const row = (name, desc, control) => `
<div class="themeModSetting themeModNoDivider">
    <div class="themeModSettingText">
        <div class="themeModSettingName">${name}</div>
        <div class="themeModSettingDescription">${desc}</div>
    </div>
    ${control}
</div>`;

        return `
<div class="themeModSubsectionTitle themeModSpacingSubsection">
    Clock &amp; Time
</div>
${row("Clock", "A small clock next to the flower. Click it to see your time on FlockMod.", toggle("themeModClockOn", true))}
${row("24-hour time", "Shows 15:30 instead of 3:30 PM.", toggle("themeModClock24h", false))}
${row("Active time only", "Only counts time while you're drawing, typing or clicking.", toggle("themeModClockActive", false))}
${row("Break reminder", "A gentle nudge to stretch and rest your eyes.",
    `<select id="themeModBreakEvery" class="themeModSelect" data-default="0">${BREAK_CHOICES.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select>`)}`;
    }

    function setupClockPanel(dialog) {
        const on = dialog.querySelector("#themeModClockOn");
        const h24 = dialog.querySelector("#themeModClock24h");
        const active = dialog.querySelector("#themeModClockActive");
        const brk = dialog.querySelector("#themeModBreakEvery");

        if (!on || !h24 || !active || !brk) {
            return;
        }

        const fill = (st) => {
            on.checked = st.on;
            h24.checked = st.h24;
            active.checked = st.active;
            brk.value = String(st.brk);
        };
        const read = () => ({ on: on.checked, h24: h24.checked, active: active.checked, brk: Number(brk.value) });
        const preview = () => applyClock(read());

        fill(readSavedClock());
        [on, h24, active, brk].forEach((el) => el.addEventListener("change", preview));

        const save = (st) => {
            localStorage.setItem(CLOCK_LS.on, String(st.on));
            localStorage.setItem(CLOCK_LS.h24, String(st.h24));
            localStorage.setItem(CLOCK_LS.active, String(st.active));
            localStorage.setItem(CLOCK_LS.brk, String(st.brk));
        };

        dialog.querySelector(".themeModApplyButton").addEventListener("click", () => save(read()));
        dialog.querySelector(".themeModResetButton").addEventListener("click", () => {
            save({ on: true, h24: false, active: false, brk: 0 });
            fill(readSavedClock());
            preview();
        });
        dialog.querySelector(".closeButton").addEventListener("click", applySavedClock);
    }

    const thumbRoomChecked = new WeakSet();

    function makeThumbRoom() {
        if (!document.documentElement.classList.contains("flockmodThumbShapeActive")) {
            return;
        }

        document.querySelectorAll('#sidebar .fmSlider, #sidebar .fmSwitch, .dialog:not([name="themeModMenu"]) .fmSlider').forEach((slider) => {
            /* v1.6.2: each slider is checked once, not every half second */
            if (thumbRoomChecked.has(slider)) {
                return;
            }
            thumbRoomChecked.add(slider);

            let el = slider.parentElement;

            /* Only the slider's own row. Section boxes (which need their
               clipping to collapse) and scroll areas are never touched. */
            if (
                !el ||
                el.id === "sidebar" ||
                el.classList.contains("flockmodThumbRoom") ||
                el.matches(".containerContent, .boxBgContainer, .containerSidebar, .os-viewport, .os-padding, .os-content, .dynamicDialogArea, .modal-body")
            ) {
                return;
            }

            const style = getComputedStyle(el);

            if (style.display === "block" && style.overflow === "hidden") {
                el.classList.add("flockmodThumbRoom");
            }
        });
    }

    function readSavedThumbShape() {
        const shape = localStorage.getItem(THUMB_SHAPE_LS);
        const size = Number(localStorage.getItem(THUMB_SHAPE_SIZE_LS));

        return {
            enabled: localStorage.getItem(THUMB_SHAPE_ENABLED_LS) === "true",
            shape: THUMB_SHAPE_CHOICES.includes(shape) ? shape : "heart",
            size: Number.isInteger(size) && size >= 100 && size <= 150 ? size : 100
        };
    }

    function applySavedThumbShape() {
        const saved = readSavedThumbShape();
        applyThumbShape(customizationsEnabled && saved.enabled, saved.shape, saved.size);
    }

    function buildThumbShapeOptionsHTML() {
        return THUMB_SHAPE_CHOICES.map((key) =>
            `<option value="${key}">${THUMB_SHAPES[key].label}</option>`
        ).join("");
    }


    /* =========================================================
       ANIMATIONS (Animations tab)
       Everything is CSS. The script only switches classes on
       <html> and sets one speed variable, so an effect that is
       OFF costs nothing. Only cheap properties are animated
       (opacity, scale, translate, rotate), and every effect plays
       once and stops, so nothing runs while you draw.
       Personal setting: not part of share codes.
       ========================================================= */

    const ANIM_ENABLED_LS = "flockmodAnimEnabled";
    const ANIM_SPEED_LS = "flockmodAnimSpeed";

    const ANIM_EFFECTS = [
        {
            key: "Popups",
            cls: "fmAnimPopups",
            name: "Popups",
            description: "FlockMod popups fade in when they open."
        },
        {
            key: "Hover",
            cls: "fmAnimHover",
            name: "Hover & press",
            description: "Buttons lift on hover and press in when clicked."
        },
        {
            key: "Select",
            cls: "fmAnimSelect",
            name: "Selections & alerts",
            description: "A pop when you pick a tool, a wiggle on new badges."
        },
        {
            key: "Menu",
            cls: "fmAnimMenu",
            name: "Mod menu effects",
            description: "This menu fades in, swatches pulse and the main switch blooms."
        }
    ].map((effect) => ({
        ...effect,
        ls: `flockmodAnim${effect.key}`,
        toggleId: `themeModAnim${effect.key}`
    }));

    const reduceMotionQuery = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : { matches: false };

    function readSavedAnimSettings() {
        const speed = Number(localStorage.getItem(ANIM_SPEED_LS));
        const effects = {};

        ANIM_EFFECTS.forEach((effect) => {
            effects[effect.key] = localStorage.getItem(effect.ls) !== "false"; /* default ON */
        });

        return {
            enabled: localStorage.getItem(ANIM_ENABLED_LS) !== "false",     /* default ON */
            speed: Number.isInteger(speed) && speed >= 50 && speed <= 200 ? speed : 100,
            effects
        };
    }

    /* speed is a percentage: 200 = twice as fast (half the time) */
    function applyAnimSettings(st) {
        const root = document.documentElement;
        const on = st.enabled && !reduceMotionQuery.matches && !liteMode;

        ANIM_EFFECTS.forEach((effect) => {
            root.classList.toggle(effect.cls, on && st.effects[effect.key]);
        });

        root.style.setProperty("--fm-anim-speed", String(100 / st.speed));
    }

    function applySavedAnimations() {
        applyAnimSettings(readSavedAnimSettings());
    }

    function animToggleHTML(id) {
        return `
            <label class="themeModToggle">
                <input type="checkbox" id="${id}">
                <span class="themeModToggleTrack">
                    <span class="themeModToggleOption themeModToggleOff">OFF</span>
                    <span class="themeModToggleOption themeModToggleOn">ON</span>
                    <span class="themeModToggleThumb"></span>
                </span>
            </label>`;
    }

    function buildAnimationsPanelHTML() {
        return `
                        <div class="themeModSectionContent" data-theme-panel="animations">

                            <div class="themeModSubsectionTitle">
                                Animations
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Enable animations</div>
                                    <div class="themeModSettingDescription">
                                        Turns every effect below on or off at once.
                                    </div>
                                </div>
                                ${animToggleHTML("themeModAnimEnabled")}
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Speed</div>
                                    <div class="themeModSettingDescription">
                                        Higher is snappier, lower is slower and softer.
                                    </div>
                                </div>
                                <div class="themeModRangeControl">
                                    <input type="range" id="themeModAnimSpeed" class="themeModRange" min="50" max="200" step="10" value="100">
                                    <span id="themeModAnimSpeedValue" class="themeModRangeValue">1.0×</span>
                                </div>
                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Effects
                            </div>

                            ${ANIM_EFFECTS.map((effect) => `
                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">${effect.name}</div>
                                    <div class="themeModSettingDescription">${effect.description}</div>
                                </div>
                                ${animToggleHTML(effect.toggleId)}
                            </div>`).join("")}

                            <div class="themeModLocalNote">
                                <i class="fas fa-circle-info"></i>
                                <span>Effects play once and stop, so drawing never slows down. They stay off if your computer's "reduce motion" setting is on.</span>
                            </div>

                            <div class="themeModReduceMotionNote themeModLocalNote" style="display: none;">
                                <i class="fas fa-universal-access"></i>
                                <span>Your computer's "reduce motion" setting is on, so animations are paused. The flower on the Enable customizations switch still shows, just without moving.</span>
                            </div>

                        </div>`;
    }

    function speedLabel(speed) {
        return `${(speed / 100).toFixed(1)}×`;
    }

    function setupAnimationsPanel(dialog) {
        const master = dialog.querySelector("#themeModAnimEnabled");
        const speed = dialog.querySelector("#themeModAnimSpeed");
        const speedValue = dialog.querySelector("#themeModAnimSpeedValue");
        const effectToggles = ANIM_EFFECTS.map((effect) => ({
            effect,
            toggle: dialog.querySelector(`#${effect.toggleId}`)
        }));
        const reduceNote = dialog.querySelector(".themeModReduceMotionNote");

        function fill(st) {
            master.checked = st.enabled;
            speed.value = String(st.speed);
            speedValue.textContent = speedLabel(st.speed);
            effectToggles.forEach(({ effect, toggle }) => {
                toggle.checked = st.effects[effect.key];
            });
        }

        function readInputs() {
            const effects = {};
            effectToggles.forEach(({ effect, toggle }) => {
                effects[effect.key] = toggle.checked;
            });
            return { enabled: master.checked, speed: Number(speed.value), effects };
        }

        function preview() {
            speedValue.textContent = speedLabel(Number(speed.value));
            applyAnimSettings(readInputs());
        }

        fill(readSavedAnimSettings());
        reduceNote.style.display = reduceMotionQuery.matches ? "" : "none";

        master.addEventListener("change", preview);
        speed.addEventListener("input", preview);
        effectToggles.forEach(({ toggle }) => toggle.addEventListener("change", preview));

        /* Swatch pulse: on "change" (when a pick is finished), not
           "input", so dragging inside the picker doesn't spam it */
        dialog.addEventListener("change", (event) => {
            const el = event.target;

            if (el instanceof HTMLInputElement && el.type === "color") {
                playOnce(el, "fmPulse");
            }
        });

        /* Bloom: plays only when the switch is turned ON by you */
        const enabledToggle = dialog.querySelector("#themeModEnabled");
        const bloomLabel = enabledToggle && enabledToggle.closest(".themeModToggle");

        if (bloomLabel) {
            bloomLabel.classList.add("themeModBloomToggle");
            enabledToggle.addEventListener("change", () => {
                if (enabledToggle.checked) {
                    playOnce(bloomLabel, "fmBloomPlay");
                } else {
                    bloomLabel.classList.remove("fmBloomPlay");
                }
            });
        }

        const applyBtn = dialog.querySelector(".themeModApplyButton");

        if (applyBtn) {
            applyBtn.addEventListener("click", () => burstPetals(applyBtn));
        }

        return {
            save() {
                const st = readInputs();
                localStorage.setItem(ANIM_ENABLED_LS, st.enabled);
                localStorage.setItem(ANIM_SPEED_LS, st.speed);
                ANIM_EFFECTS.forEach((effect) => {
                    localStorage.setItem(effect.ls, st.effects[effect.key]);
                });
            },
            reset() {
                const st = { enabled: true, speed: 100, effects: {} };
                ANIM_EFFECTS.forEach((effect) => { st.effects[effect.key] = true; });
                fill(st);
                applyAnimSettings(st);
                this.save();
            }
        };
    }


    /* =========================================================
       CELEBRATION EFFECTS (part of "Mod menu effects")
       Petal burst + pink glow on Apply, pink shimmer when a
       theme is loaded. The elements only exist for about a
       second and are removed afterwards.
       ========================================================= */

    function menuEffectsOn() {
        return document.documentElement.classList.contains("fmAnimMenu");
    }

    function animSpeedFactor() {
        const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fm-anim-speed"));
        return Number.isFinite(v) && v > 0 ? v : 1;
    }

    function burstPetals(button) {
        if (!menuEffectsOn() || !button) {
            return;
        }

        /* Petals live inside the menu itself, so they share its
           layer (FlockMod's popup layer can sit above anything added
           straight to the page) and can't end up off screen */
        const dialog = button.closest(MOD_DIALOG_SELECTOR);

        if (!dialog) {
            return;
        }

        const r = button.getBoundingClientRect();
        const d = dialog.getBoundingClientRect();
        const layer = document.createElement("div");
        layer.className = "themeModPetalBurst";
        layer.style.left = `${r.left - d.left - dialog.clientLeft + r.width / 2}px`;
        layer.style.top = `${r.top - d.top - dialog.clientTop + r.height / 2}px`;

        const count = 9;

        for (let i = 0; i < count; i++) {
            /* Fan upwards (Apply sits at the bottom of the menu) */
            const angle = (-90 + (i - (count - 1) / 2) * 20 + (Math.random() * 12 - 6)) * Math.PI / 180;
            const dist = 45 + Math.random() * 35;
            const petal = document.createElement("div");

            petal.className = "themeModPetal";
            petal.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
            petal.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
            petal.style.setProperty("--rot", `${(Math.random() < 0.5 ? -1 : 1) * (120 + Math.random() * 200)}deg`);
            petal.style.setProperty("--size", String(0.7 + Math.random() * 0.45));
            petal.style.animationDelay = `${Math.round(Math.random() * 60 * animSpeedFactor())}ms`;
            layer.appendChild(petal);
        }

        dialog.appendChild(layer);
        setTimeout(() => layer.remove(), 1400 * animSpeedFactor());

        playOnce(button, "fmApplyGlow");
    }

    function playThemeShimmer(dialog) {
        if (!menuEffectsOn() || !dialog) {
            return;
        }

        const shimmer = document.createElement("div");
        shimmer.className = "themeModShimmer";
        dialog.appendChild(shimmer);
        setTimeout(() => shimmer.remove(), 1300 * animSpeedFactor());
    }

    /* Restarts a one-shot CSS animation class and cleans it up after
       (the longest animation inside it decides when it's removed) */
    function playOnce(el, cls) {
        el.classList.remove(cls);
        void el.offsetWidth;
        el.classList.add(cls);

        clearTimeout(el._fmPlayTimer);
        el._fmPlayTimer = setTimeout(() => el.classList.remove(cls), 2500);
    }

    /* =========================================================
       MOD MENU SIZE + POSITION
       Opens at a comfortable size (fitted to the window) and
       remembers where you last left it.
       ========================================================= */

    const MENU_RECT_LS = "flockmodMenuRect";

    function getInitialMenuRect() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let rect = null;

        try {
            rect = JSON.parse(localStorage.getItem(MENU_RECT_LS) || "null");
        } catch (error) {
            rect = null;
        }

        let width = rect && Number(rect.width) ? rect.width : Math.min(760, vw * 0.85);
        let height = rect && Number(rect.height) ? rect.height : Math.min(560, vh * 0.85);

        width = Math.max(400, Math.min(width, vw - 20));
        height = Math.max(300, Math.min(height, vh - 20));

        let left = rect && Number.isFinite(rect.left) ? rect.left : (vw - width) / 2;
        let top = rect && Number.isFinite(rect.top) ? rect.top : (vh - height) / 2;

        /* Keep it on screen if the window got smaller since */
        left = Math.max(0, Math.min(left, vw - width));
        top = Math.max(0, Math.min(top, vh - height));

        return {
            width: `${Math.round(width)}px`,
            height: `${Math.round(height)}px`,
            left: `${Math.round(left)}px`,
            top: `${Math.round(top)}px`
        };
    }

    function rememberMenuRect(dialog) {
        const rect = {
            width: parseFloat(dialog.style.width),
            height: parseFloat(dialog.style.height),
            left: parseFloat(dialog.style.left),
            top: parseFloat(dialog.style.top)
        };

        if (Object.values(rect).every(Number.isFinite)) {
            localStorage.setItem(MENU_RECT_LS, JSON.stringify(rect));
        }
    }


    /* =========================================================
       SOUNDS (Sounds tab)
       Watches only the chat messages box and the Messenger
       conversation (nothing else on the page), and plays a sound
       on your computer when something happens. Built-in sounds are
       made in code with Web Audio (no files). Uploaded sounds are
       kept in this browser only. Nothing is sent anywhere.
       Personal setting: not part of share codes.
       ========================================================= */

    const SOUND_DB_NAME = "flockmodThemeModSounds";
    const SOUND_DB_STORE = "files";
    const SOUND_LIBRARY_LS = "flockmodSoundLibrary";
    const MAX_SOUND_FILE_BYTES = 1024 * 1024;

    const SOUND_EVENTS = [
        {
            key: "Mention",
            name: "Your name mentioned",
            description: "Someone says your name (or an extra word below) in chat.",
            def: { enabled: true, sound: "builtin:petal", volume: 80 }
        },
        {
            key: "Private",
            name: "Private chat message",
            description: "A new private chat message. (FlockMod's own: \"Private message tone\")",
            def: { enabled: true, sound: "builtin:chime", volume: 70 }
        },
        {
            key: "Messenger",
            name: "Messenger message",
            description: "A new Messenger message, even while it's closed. (FlockMod's own: \"Messenger message tone\")",
            def: { enabled: true, sound: "builtin:bell", volume: 70 }
        },
        {
            key: "Chat",
            name: "Any chat message",
            description: "Every public or staff chat message. Gets noisy! (FlockMod's own: \"Public/Staff chat message tone\")",
            def: { enabled: false, sound: "builtin:pop", volume: 45 }
        },
        {
            key: "Troll",
            name: "Possible griefer",
            description: "Troll detection flagged someone (Safety tab).",
            def: { enabled: true, sound: "builtin:bell", volume: 70 }
        },
        {
            key: "JoinLeave",
            name: "Someone joins or leaves",
            description: "The grey \"has entered the room\" / left messages.",
            def: { enabled: false, sound: "builtin:sparkle", volume: 45 }
        }
    ];

    /* ---------- Built-in sounds (made in code) ---------- */

    function playTone(ctx, dest, start, freq, dur, type, peak, attack = 0.008) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(peak, start + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(start);
        osc.stop(start + dur + 0.05);
    }

    /* a tone that slides from f0 to f1 */
    function playSweep(ctx, dest, start, f0, f1, dur, type, peak) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f0, start);
        osc.frequency.exponentialRampToValueAtTime(f1, start + dur * 0.8);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(peak, start + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(start);
        osc.stop(start + dur + 0.05);
    }

    const BUILTIN_SOUNDS = {
        petal: {
            group: "Cute",
            label: "Petal (sakura)",
            play(ctx, dest, t) {
                [1046.5, 1318.5, 1568, 2093].forEach((f, i) => {
                    playTone(ctx, dest, t + i * 0.085, f, 0.55, "triangle", 0.28, 0.02);
                });
            }
        },
        chime: {
            group: "Calm",
            label: "Soft chime",
            play(ctx, dest, t) {
                playTone(ctx, dest, t, 1318.5, 0.6, "sine", 0.45);
                playTone(ctx, dest, t + 0.13, 1975.5, 0.7, "sine", 0.35);
            }
        },
        bell: {
            group: "Calm",
            label: "Bell",
            play(ctx, dest, t) {
                [[880, 0.4], [880 * 2.76, 0.14], [880 * 5.4, 0.06]].forEach(([f, p]) => {
                    playTone(ctx, dest, t, f, 1.1, "sine", p, 0.004);
                });
            }
        },
        pop: {
            group: "Cute",
            label: "Bubble pop",
            play(ctx, dest, t) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(750, t);
                osc.frequency.exponentialRampToValueAtTime(190, t + 0.09);
                gain.gain.setValueAtTime(0.0001, t);
                gain.gain.exponentialRampToValueAtTime(0.55, t + 0.005);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
                osc.connect(gain);
                gain.connect(dest);
                osc.start(t);
                osc.stop(t + 0.15);
            }
        },
        sparkle: {
            group: "Cute",
            label: "Sparkle",
            play(ctx, dest, t) {
                [2093, 2637, 3136, 4186].forEach((f, i) => {
                    playTone(ctx, dest, t + i * 0.05, f, 0.22, "triangle", 0.16, 0.004);
                });
            }
        },

        /* ---- v1.6.3: more built-in sounds (all made in code, no files) ---- */
        musicbox: {
            group: "Cute",
            label: "Music box",
            play(ctx, dest, t) {
                [1568, 1318.5, 1046.5, 1318.5, 1568, 2093].forEach((f, i) => {
                    playTone(ctx, dest, t + i * 0.12, f, 0.8, "sine", 0.22, 0.004);
                    playTone(ctx, dest, t + i * 0.12, f * 2, 0.35, "sine", 0.04, 0.004);
                });
            }
        },
        kalimba: {
            group: "Cute",
            label: "Kalimba",
            play(ctx, dest, t) {
                [784, 988, 1175].forEach((f, i) => {
                    playTone(ctx, dest, t + i * 0.1, f, 0.5, "sine", 0.34, 0.003);
                    playTone(ctx, dest, t + i * 0.1, f * 3.9, 0.12, "sine", 0.05, 0.002);
                });
            }
        },
        twinkle: {
            group: "Cute",
            label: "Twinkle",
            play(ctx, dest, t) {
                [2637, 3136, 3951].forEach((f, i) => {
                    playTone(ctx, dest, t + i * 0.07, f, 0.35, "triangle", 0.14, 0.004);
                });
            }
        },
        meow: {
            group: "Cute",
            label: "Kitty meow",
            play(ctx, dest, t) {
                const osc = ctx.createOscillator();
                const filter = ctx.createBiquadFilter();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(620, t);
                osc.frequency.linearRampToValueAtTime(980, t + 0.12);
                osc.frequency.linearRampToValueAtTime(560, t + 0.42);
                filter.type = "bandpass";
                filter.Q.value = 4;
                filter.frequency.setValueAtTime(900, t);
                filter.frequency.linearRampToValueAtTime(1800, t + 0.15);
                filter.frequency.linearRampToValueAtTime(800, t + 0.42);
                gain.gain.setValueAtTime(0.0001, t);
                gain.gain.exponentialRampToValueAtTime(0.5, t + 0.04);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.46);
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(dest);
                osc.start(t);
                osc.stop(t + 0.5);
            }
        },
        waterdrop: {
            group: "Calm",
            label: "Water drop",
            play(ctx, dest, t) {
                playSweep(ctx, dest, t, 600, 1400, 0.16, "sine", 0.45);
                playSweep(ctx, dest, t + 0.13, 800, 1800, 0.12, "sine", 0.18);
            }
        },
        windchimes: {
            group: "Calm",
            label: "Wind chimes",
            play(ctx, dest, t) {
                [[2349, 0], [3136, 0.09], [2794, 0.21], [3520, 0.3], [4186, 0.42]].forEach(([f, d]) => {
                    playTone(ctx, dest, t + d, f, 1.2, "sine", 0.12, 0.003);
                });
            }
        },
        harp: {
            group: "Calm",
            label: "Harp",
            play(ctx, dest, t) {
                [523.3, 659.3, 784, 1046.5, 1318.5, 1568].forEach((f, i) => {
                    playTone(ctx, dest, t + i * 0.045, f, 0.9, "triangle", 0.16, 0.004);
                });
            }
        },
        coin: {
            group: "Retro",
            label: "Coin",
            play(ctx, dest, t) {
                playTone(ctx, dest, t, 988, 0.07, "square", 0.1, 0.002);
                playTone(ctx, dest, t + 0.07, 1318.5, 0.35, "square", 0.1, 0.002);
            }
        },
        blip: {
            group: "Retro",
            label: "8-bit blip",
            play(ctx, dest, t) {
                playSweep(ctx, dest, t, 900, 1500, 0.08, "square", 0.09);
            }
        },
        levelup: {
            group: "Retro",
            label: "Level up",
            play(ctx, dest, t) {
                [523.3, 659.3, 784, 1046.5].forEach((f, i) => {
                    playTone(ctx, dest, t + i * 0.07, f, 0.1, "square", 0.08, 0.002);
                });
                playTone(ctx, dest, t + 0.28, 1318.5, 0.32, "square", 0.08, 0.002);
            }
        },
        knock: {
            group: "Alerts",
            label: "Soft knock",
            play(ctx, dest, t) {
                [0, 0.15].forEach((d) => {
                    playSweep(ctx, dest, t + d, 190, 90, 0.11, "sine", 0.7);
                    playSweep(ctx, dest, t + d, 420, 200, 0.05, "triangle", 0.12);
                });
            }
        },
        lowping: {
            group: "Alerts",
            label: "Low ping",
            play(ctx, dest, t) {
                playTone(ctx, dest, t, 440, 0.9, "sine", 0.4, 0.004);
                playTone(ctx, dest, t, 880, 0.3, "sine", 0.08, 0.004);
            }
        },
        doorbell: {
            group: "Alerts",
            label: "Doorbell",
            play(ctx, dest, t) {
                playTone(ctx, dest, t, 659.3, 0.7, "sine", 0.35, 0.004);
                playTone(ctx, dest, t + 0.32, 523.3, 0.9, "sine", 0.35, 0.004);
            }
        }
    };

    /* ---------- Audio plumbing ---------- */

    let soundCtx = null;

    function getSoundCtx() {
        if (!soundCtx) {
            const Ctx = window.AudioContext || window.webkitAudioContext;

            if (!Ctx) {
                return null;
            }

            soundCtx = new Ctx();
        }

        if (soundCtx.state === "suspended") {
            soundCtx.resume().catch(() => {});
        }

        return soundCtx;
    }

    /* Browsers only allow sound after you've clicked or typed once */
    function setupSoundUnlock() {
        const unlock = () => {
            if (soundCtx || readSavedSoundSettings().enabled) {
                getSoundCtx();
            }
        };

        window.addEventListener("pointerdown", unlock, true);
        window.addEventListener("keydown", unlock, true);
    }

    function openSoundDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(SOUND_DB_NAME, 1);
            request.onupgradeneeded = () => request.result.createObjectStore(SOUND_DB_STORE);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function soundDB(mode, action) {
        const db = await openSoundDB();

        try {
            return await new Promise((resolve, reject) => {
                const tx = db.transaction(SOUND_DB_STORE, mode);
                const request = action(tx.objectStore(SOUND_DB_STORE));
                tx.oncomplete = () => resolve(request ? request.result : undefined);
                tx.onerror = () => reject(tx.error);
            });
        } finally {
            db.close();
        }
    }

    function getSoundLibrary() {
        try {
            const list = JSON.parse(localStorage.getItem(SOUND_LIBRARY_LS) || "[]");
            return Array.isArray(list)
                ? list.filter((s) => s && typeof s.id === "string" && typeof s.name === "string")
                : [];
        } catch (error) {
            return [];
        }
    }

    function setSoundLibrary(list) {
        localStorage.setItem(SOUND_LIBRARY_LS, JSON.stringify(list));
    }

    const soundBufferCache = new Map();

    async function getUploadedBuffer(ctx, id) {
        if (soundBufferCache.has(id)) {
            return soundBufferCache.get(id);
        }

        const blob = await soundDB("readonly", (store) => store.get(id));

        if (!blob) {
            return null;
        }

        const buffer = await ctx.decodeAudioData(await blob.arrayBuffer());
        soundBufferCache.set(id, buffer);
        return buffer;
    }

    function isValidSoundValue(value) {
        if (typeof value !== "string") {
            return false;
        }

        if (value.startsWith("builtin:")) {
            return Boolean(BUILTIN_SOUNDS[value.slice(8)]);
        }

        if (value.startsWith("upload:")) {
            return getSoundLibrary().some((s) => s.id === value.slice(7));
        }

        return false;
    }

    /* volume: 0..1 */
    async function playSoundValue(value, volume) {
        const ctx = getSoundCtx();

        if (!ctx || volume <= 0) {
            return;
        }

        const out = ctx.createGain();
        out.gain.value = Math.min(1, volume);
        out.connect(ctx.destination);

        const t = ctx.currentTime + 0.01;

        if (value.startsWith("builtin:") && BUILTIN_SOUNDS[value.slice(8)]) {
            BUILTIN_SOUNDS[value.slice(8)].play(ctx, out, t);
        } else if (value.startsWith("upload:")) {
            try {
                const buffer = await getUploadedBuffer(ctx, value.slice(7));

                if (buffer) {
                    const src = ctx.createBufferSource();
                    src.buffer = buffer;
                    src.connect(out);
                    src.start(t);
                }
            } catch (error) {
                /* Unreadable file: stay quiet rather than break anything */
            }
        }

        setTimeout(() => out.disconnect(), 4000);
    }

    /* ---------- Settings ---------- */

    function soundLs(key, suffix) {
        return `flockmodSound${key}${suffix}`;
    }

    function clampVolume(n, def) {
        return Number.isInteger(n) && n >= 0 && n <= 100 ? n : def;
    }

    function readSavedSoundSettings() {
        const events = {};

        SOUND_EVENTS.forEach((ev) => {
            const enabledRaw = localStorage.getItem(soundLs(ev.key, "Enabled"));
            const sound = localStorage.getItem(soundLs(ev.key, "Sound"));
            const volRaw = localStorage.getItem(soundLs(ev.key, "Volume"));

            events[ev.key] = {
                enabled: enabledRaw === null ? ev.def.enabled : enabledRaw === "true",
                sound: isValidSoundValue(sound) ? sound : ev.def.sound,
                volume: volRaw === null ? ev.def.volume : clampVolume(Number(volRaw), ev.def.volume)
            };
        });

        const masterRaw = localStorage.getItem("flockmodSoundsVolume");

        return {
            enabled: localStorage.getItem("flockmodSoundsEnabled") === "true",   /* default OFF */
            volume: masterRaw === null ? 80 : clampVolume(Number(masterRaw), 80),
            quietDrawing: localStorage.getItem("flockmodSoundsQuietDrawing") === "true",
            keywords: (localStorage.getItem("flockmodSoundsKeywords") || "").slice(0, 120),
            events
        };
    }

    function defaultSoundSettings() {
        const events = {};
        SOUND_EVENTS.forEach((ev) => { events[ev.key] = { ...ev.def }; });
        return { enabled: false, volume: 80, quietDrawing: false, keywords: "", events };
    }

    function writeSoundSettings(st) {
        localStorage.setItem("flockmodSoundsEnabled", st.enabled);
        localStorage.setItem("flockmodSoundsVolume", st.volume);
        localStorage.setItem("flockmodSoundsQuietDrawing", st.quietDrawing);
        localStorage.setItem("flockmodSoundsKeywords", st.keywords);

        SOUND_EVENTS.forEach((ev) => {
            const e = st.events[ev.key];
            localStorage.setItem(soundLs(ev.key, "Enabled"), e.enabled);
            localStorage.setItem(soundLs(ev.key, "Sound"), e.sound);
            localStorage.setItem(soundLs(ev.key, "Volume"), e.volume);
        });
    }

    /* What the watcher uses. The menu updates it live (preview);
       closing without Apply reloads it from storage. */
    let liveSoundSettings = null;

    function applySavedSounds() {
        liveSoundSettings = readSavedSoundSettings();
    }

    /* ---------- Firing ---------- */

    let drawingNow = false;
    let lastSentAt = 0;
    let lastAnySoundAt = 0;
    const lastSoundAt = {};

    function setupSoundActivityTracking() {
        /* Drawing = pressing on a canvas */
        window.addEventListener("pointerdown", (event) => {
            drawingNow = event.target instanceof HTMLCanvasElement;
        }, true);

        ["pointerup", "pointercancel"].forEach((type) => {
            window.addEventListener(type, () => { drawingNow = false; }, true);
        });

        /* Your own messages: anything that shows up right after you
           send (Enter or a click in the chat / Messenger) is yours */
        const markSent = (event) => {
            const target = event.target;

            if (target instanceof Element && target.closest('.dialog[name="chat"], .dialog[name="messenger"]')) {
                if (event.type === "click" || event.key === "Enter") {
                    lastSentAt = Date.now();
                }
            }

            /* Clicking a conversation (or anything) in the Messenger
               loads its old messages. Those aren't new, so the
               conversation watcher ignores the next 2 seconds. */
            if (event.type === "click" && target instanceof Element && target.closest('.dialog[name="messenger"]')) {
                soundWatches.messenger.armedAt = Math.max(soundWatches.messenger.armedAt, Date.now() + 2000);
            }
        };

        window.addEventListener("keydown", markSent, true);
        window.addEventListener("click", markSent, true);
    }

    function fireSoundEvent(key) {
        const st = liveSoundSettings;

        if (!st || !st.enabled || !customizationsEnabled) {
            return;
        }

        const ev = st.events[key];

        if (!ev || !ev.enabled) {
            return;
        }

        if (st.quietDrawing && drawingNow) {
            return;
        }

        const now = Date.now();

        /* Floods: one sound per event every 1.5s, and never two
           different sounds on top of each other */
        if (now - (lastSoundAt[key] || 0) < 1500 || now - lastAnySoundAt < 250) {
            return;
        }

        lastSoundAt[key] = now;
        lastAnySoundAt = now;
        if (localStorage.getItem("flockmodChatNotifDebug") === "1") {
            console.log("[FlockTheme sound]", key, ev.sound);
        }

        playSoundValue(ev.sound, (st.volume / 100) * (ev.volume / 100));
    }

    function getMyName() {
        const row = document.querySelector("#sidebar tr.myself");
        const cells = row ? row.querySelectorAll("td") : [];
        const cell = cells.length ? cells[cells.length - 1] : null;
        return cell ? cell.textContent.trim() : "";
    }

    function isMention(text) {
        const st = liveSoundSettings;
        const words = [getMyName(), ...(st ? st.keywords.split(",") : [])]
            .map((w) => w.trim().toLowerCase())
            .filter((w) => w.length >= 2);
        const lower = text.toLowerCase();

        /* Whole words only, so "maz" doesn't match "amazing".
           Letters/numbers/_ right before or after = part of a word. */
        return words.some((w) => {
            const safe = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            return new RegExp(`(^|[^\\p{L}\\p{N}_])${safe}($|[^\\p{L}\\p{N}_])`, "u").test(lower);
        });
    }

    /* Only small additions count as "new". Loading history, joining
       a room or opening a conversation adds lots at once (or clears
       the box first), and those are ignored. */
    function newElementsIn(record) {
        if (record.removedNodes.length) {
            return [];
        }

        const added = [...record.addedNodes].filter((n) => n.nodeType === 1);
        return added.length <= 3 ? added : [];
    }

    function handleChatMutations(records, watch) {
        /* Troll detection: color flagged names in new messages */
        if (trollFlagged.size) {
            records.forEach((record) => record.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    const block = node.closest(".chatBlock") || node;
                    markTrollChat(block);
                }
            }));
        }

        if (Date.now() < watch.armedAt) {
            chatSoundLines(watch.el).forEach((line) => chatSoundSeen.add(line));
            return;   /* the chat was just (re)built: that's history */
        }

        if (!chatSoundTimer) {
            chatSoundTimer = setTimeout(() => chatSoundScan(watch), 120);
        }
    }

    /* v1.6.3: every message line already heard. Anything in the chat that
       isn't in here is new, even when FlockMod trims old messages at the
       same moment (which the old check skipped). Works with the chat
       closed too, so the chat notification cards and sounds agree. */
    let chatSoundSeen = new WeakSet();
    let chatSoundTimer = 0;

    function chatSoundLines(root) {
        return root ? [...root.querySelectorAll(".chatBlock .msgLine, .chatBlock:not(:has(.msgLine))")] : [];
    }

    function chatSoundScan(watch) {
        chatSoundTimer = 0;
        const fresh = chatSoundLines(watch.el).filter((line) => !chatSoundSeen.has(line));

        if (fresh.length > 6) {
            fresh.forEach((line) => chatSoundSeen.add(line));   /* history loading */
            return;
        }

        /* One sound per batch: the most important one */
        const rank = { Private: 4, Mention: 3, Chat: 2, JoinLeave: 1 };
        let best = null;

        fresh.forEach((line) => {
            const textEl = line.matches(".msgText") ? line : (line.querySelector(".msgText") || line);
            const text = textEl.textContent || "";

            if (!text.trim() && !line.querySelector("img")) {
                return;   /* still empty: FlockMod fills it in a moment */
            }
            chatSoundSeen.add(line);

            const block = line.closest(".chatBlock");
            let key = null;

            if (!block || block.classList.contains("motdBlock")) {
                return;
            }

            if (block.classList.contains("eventBlock")) {
                key = /(entered|left|joined)/i.test(text) ? "JoinLeave" : null;
            } else if (block.dataset.type === "MYMSG" || Date.now() - lastSentAt < 2000) {
                return;   /* your own message */
            } else {
                const channelName = block.closest(".channelMessages")?.getAttribute("name") || "";
                key = channelName && !channelName.startsWith("#") ? "Private"
                    : (isMention(text) ? "Mention" : "Chat");
            }

            if (key && (!best || rank[key] > rank[best])) {
                best = key;
            }
        });

        if (best && liveSoundSettings && liveSoundSettings.enabled) {
            fireSoundEvent(best);
        }
    }

    function handleMessengerMutations(records, watch) {
        if (!liveSoundSettings || !liveSoundSettings.enabled || Date.now() < watch.armedAt) {
            return;
        }

        records.forEach((record) => {
            newElementsIn(record).forEach((node) => {
                let own = null;

                if (node.matches(".offlineMessage")) {
                    own = node.classList.contains("offlineOwn");
                } else if (node.matches(".offlineBlock")) {
                    const msg = node.closest(".offlineMessage");
                    own = msg ? msg.classList.contains("offlineOwn") : null;
                }

                if (own === false && Date.now() - lastSentAt >= 2000) {
                    fireSoundEvent("Messenger");
                }
            });
        });
    }

    /* The Messenger's unread badge in the bottom bar. When its number
       goes up, a new Messenger message arrived, even with the
       Messenger closed. Checked in the 500ms loop (one small read). */
    let lastMessengerBadge = null;

    function findMessengerBadge() {
        const known = document.querySelector("#bottombar > nav > div > ul:nth-child(3) > li:nth-child(7) > a > span.badge, " +
                                             "#bottombar > nav > div > ul:nth-child(3) > li:nth-child(7) > a > span");

        if (known) {
            return known;
        }

        /* Fallback: a badge on a bottom bar button with an envelope/chat icon */
        return [...document.querySelectorAll("#bottombar .nav-link .badge")].find((badge) => {
            const link = badge.closest(".nav-link");
            return link && !link.matches(".themeModMenuButton, .themeModRefButton") &&
                link.querySelector(".fa-envelope, .fa-comment, .fa-comments, .fa-comment-dots, .fa-inbox");
        }) || null;
    }

    function checkMessengerBadge() {
        const badge = findMessengerBadge();
        const hidden = !badge || badge.offsetParent === null;
        const count = hidden ? 0 : (parseInt(badge.textContent.replace(/\D/g, ""), 10) || 0);

        if (lastMessengerBadge !== null && count > lastMessengerBadge && Date.now() - lastSentAt >= 2000) {
            fireSoundEvent("Messenger");
        }

        lastMessengerBadge = count;
    }

    const soundWatches = {
        chat: { id: "chatMessages", el: null, observer: null, armedAt: 0, handler: handleChatMutations },
        messenger: { id: "messengerConversation", el: null, observer: null, armedAt: 0, handler: handleMessengerMutations }
    };

    /* Called from the 500ms check loop: (re)attaches the two
       watchers when FlockMod creates or replaces those boxes */
    function watchSoundTargets() {
        Object.values(soundWatches).forEach((watch) => {
            const el = document.getElementById(watch.id);

            if (el === watch.el) {
                return;
            }

            if (watch.observer) {
                watch.observer.disconnect();
            }

            watch.el = el;
            watch.observer = null;

            if (el) {
                if (watch.id === "chatMessages") {
                    chatSoundSeen = new WeakSet();
                    chatSoundLines(el).forEach((line) => chatSoundSeen.add(line));
                }
                /* Give FlockMod a moment to fill in old messages */
                watch.armedAt = Date.now() + 3000;
                watch.observer = new MutationObserver((records) => watch.handler(records, watch));
                watch.observer.observe(el, { childList: true, subtree: true });
            }
        });
    }

    /* ---------- Sounds panel ---------- */

    function soundOptionsHTML() {
        /* v1.6.3: grouped, so the longer list is easy to scan */
        const builtins = ["Cute", "Calm", "Retro", "Alerts"].map((g) => {
            const opts = Object.entries(BUILTIN_SOUNDS)
                .filter(([, s]) => (s.group || "Cute") === g)
                .map(([key, s]) => `<option value="builtin:${key}">${s.label}</option>`)
                .join("");
            return opts ? `<optgroup label="${g}">${opts}</optgroup>` : "";
        }).join("");
        const uploads = getSoundLibrary()
            .map((s) => `<option value="upload:${escapeHTML(s.id)}">${escapeHTML(s.name)}</option>`)
            .join("");

        return builtins +
            (uploads ? `<optgroup label="Your sounds">${uploads}</optgroup>` : "");
    }

    function soundToggleHTML(id) {
        return `
            <label class="themeModToggle">
                <input type="checkbox" id="${id}">
                <span class="themeModToggleTrack">
                    <span class="themeModToggleOption themeModToggleOff">OFF</span>
                    <span class="themeModToggleOption themeModToggleOn">ON</span>
                    <span class="themeModToggleThumb"></span>
                </span>
            </label>`;
    }

    function buildSoundsPanelHTML() {
        return `
                        <div class="themeModSectionContent" data-theme-panel="sounds">

                            <div class="themeModLocalNote">
                                <i class="fas fa-volume-up"></i>
                                <span>To hear only the mod's sounds, turn off the matching tones in FlockMod's Configuration &gt; Settings &gt; Sounds. Otherwise you'll hear both.</span>
                            </div>

                            <div class="themeModSubsectionTitle">
                                Sounds
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Enable sounds</div>
                                    <div class="themeModSettingDescription">Play the mod's notification sounds.</div>
                                </div>
                                ${soundToggleHTML("themeModSoundsEnabled")}
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Master volume</div>
                                    <div class="themeModSettingDescription">Turns every sound below up or down.</div>
                                </div>
                                <div class="themeModRangeControl">
                                    <input type="range" id="themeModSoundsVolume" class="themeModRange" min="0" max="100" step="5" value="80">
                                    <span id="themeModSoundsVolumeValue" class="themeModRangeValue">80%</span>
                                </div>
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Quiet while drawing</div>
                                    <div class="themeModSettingDescription">No sounds while you're drawing.</div>
                                </div>
                                ${soundToggleHTML("themeModSoundsQuietDrawing")}
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Extra mention words</div>
                                    <div class="themeModSettingDescription">Your username always counts. Add nicknames too, separated by commas.</div>
                                </div>
                                <input type="text" id="themeModSoundsKeywords" class="themeModTextInput themeModSoundKeywords" placeholder="e.g. nene, nini" maxlength="120" spellcheck="false">
                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Events
                            </div>

                            ${SOUND_EVENTS.map((ev) => `
                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">${ev.name}</div>
                                    <div class="themeModSettingDescription">${ev.description}</div>
                                </div>
                                ${soundToggleHTML(`themeModSound${ev.key}Enabled`)}
                            </div>

                            <div class="themeModSetting themeModNoDivider themeModSoundRow">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        <i class="fas fa-level-up-alt fa-rotate-90"></i> Sound
                                    </div>
                                </div>
                                <div class="themeModSoundControls">
                                    <select class="themeModSelect themeModSoundSelect" data-sound-select="${ev.key}"></select>
                                    <input type="range" class="themeModRange" data-sound-volume="${ev.key}" min="0" max="100" step="5" value="${ev.def.volume}">
                                    <span class="themeModRangeValue" data-sound-volume-value="${ev.key}">${ev.def.volume}%</span>
                                    <button type="button" class="themeModButton themeModSoundPlay" data-sound-preview="${ev.key}" title="Preview">
                                        <i class="fas fa-play"></i>
                                    </button>
                                </div>
                            </div>`).join("")}

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Your Sounds
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Upload a sound</div>
                                    <div class="themeModSettingDescription">An .mp3, .wav or .ogg up to 1 MB. Short sounds work best.</div>
                                </div>
                                <button type="button" class="themeModButton themeModSoundUpload">
                                    <i class="fas fa-upload"></i> Upload sound
                                </button>
                                <input type="file" class="themeModSoundFile" accept=".mp3,.wav,.ogg,.m4a,audio/*" style="display: none;">
                            </div>

                            <div class="themeModFontStatus themeModSoundStatus" style="display: none;"></div>

                            <div class="themeModFontList themeModSoundList"></div>

                            <div class="themeModLocalNote">
                                <i class="fas fa-circle-info"></i>
                                <span>Sounds play only on your computer. Uploaded sounds stay in this browser, and nobody else hears them.</span>
                            </div>

                        </div>`;
    }

    function setupSoundsPanel(dialog) {
        const panel = dialog.querySelector('[data-theme-panel="sounds"]');
        const master = panel.querySelector("#themeModSoundsEnabled");
        const volume = panel.querySelector("#themeModSoundsVolume");
        const volumeValue = panel.querySelector("#themeModSoundsVolumeValue");
        const quiet = panel.querySelector("#themeModSoundsQuietDrawing");
        const keywords = panel.querySelector("#themeModSoundsKeywords");
        const uploadButton = panel.querySelector(".themeModSoundUpload");
        const fileInput = panel.querySelector(".themeModSoundFile");
        const status = panel.querySelector(".themeModSoundStatus");
        const list = panel.querySelector(".themeModSoundList");

        const rows = SOUND_EVENTS.map((ev) => ({
            ev,
            toggle: panel.querySelector(`#themeModSound${ev.key}Enabled`),
            select: panel.querySelector(`[data-sound-select="${ev.key}"]`),
            vol: panel.querySelector(`[data-sound-volume="${ev.key}"]`),
            volValue: panel.querySelector(`[data-sound-volume-value="${ev.key}"]`),
            play: panel.querySelector(`[data-sound-preview="${ev.key}"]`)
        }));

        function refreshSelects() {
            const html = soundOptionsHTML();

            rows.forEach(({ ev, select }) => {
                const keep = select.value;
                select.innerHTML = html;
                select.value = isValidSoundValue(keep) ? keep : ev.def.sound;
            });
        }

        function fill(st) {
            master.checked = st.enabled;
            volume.value = String(st.volume);
            volumeValue.textContent = `${st.volume}%`;
            quiet.checked = st.quietDrawing;
            keywords.value = st.keywords;

            refreshSelects();

            rows.forEach(({ ev, toggle, select, vol, volValue }) => {
                const e = st.events[ev.key];
                toggle.checked = e.enabled;
                select.value = isValidSoundValue(e.sound) ? e.sound : ev.def.sound;
                vol.value = String(e.volume);
                volValue.textContent = `${e.volume}%`;
            });
        }

        function readInputs() {
            const events = {};

            rows.forEach(({ ev, toggle, select, vol }) => {
                events[ev.key] = {
                    enabled: toggle.checked,
                    sound: isValidSoundValue(select.value) ? select.value : ev.def.sound,
                    volume: Number(vol.value)
                };
            });

            return {
                enabled: master.checked,
                volume: Number(volume.value),
                quietDrawing: quiet.checked,
                keywords: keywords.value.slice(0, 120),
                events
            };
        }

        function preview() {
            volumeValue.textContent = `${volume.value}%`;
            rows.forEach(({ vol, volValue }) => { volValue.textContent = `${vol.value}%`; });
            liveSoundSettings = readInputs();
        }

        function showStatus(message, kind = "ok") {
            status.textContent = message;
            status.dataset.kind = kind;
            status.style.display = message ? "block" : "none";
        }

        function renderList() {
            const library = getSoundLibrary();

            list.innerHTML = library.map((s) => `
                <div class="themeModFontItem" data-sound-id="${escapeHTML(s.id)}">
                    <span class="themeModFontSample">${escapeHTML(s.name)}</span>
                    <button type="button" class="themeModButton themeModSoundPlay" data-action="play" title="Play"><i class="fas fa-play"></i></button>
                    <button type="button" class="themeModButton themeModDangerButton" data-action="remove">Remove</button>
                </div>
            `).join("");
        }

        fill(readSavedSoundSettings());
        renderList();

        [master, quiet].forEach((el) => el.addEventListener("change", preview));
        volume.addEventListener("input", preview);
        keywords.addEventListener("input", preview);
        keywords.addEventListener("input", () => chatHighlightRescanSoon());

        rows.forEach(({ ev, toggle, select, vol, play }) => {
            toggle.addEventListener("change", preview);
            select.addEventListener("change", (event) => {
                preview();

                /* only when you pick one yourself (not on a section reset) */
                if (event.isTrusted) {
                    playSoundValue(select.value, (Number(volume.value) / 100) * (Number(vol.value) / 100));
                }
            });
            vol.addEventListener("input", preview);
            play.addEventListener("click", () => {
                /* Preview ignores ON/OFF and cooldowns so you can always listen */
                playSoundValue(select.value, (Number(volume.value) / 100) * (Number(vol.value) / 100));
            });
        });

        /* Uploads */
        uploadButton.addEventListener("click", () => fileInput.click());

        fileInput.addEventListener("change", async () => {
            const file = fileInput.files && fileInput.files[0];
            fileInput.value = "";

            if (!file) {
                return;
            }

            if (file.size > MAX_SOUND_FILE_BYTES) {
                showStatus("That file is over 1 MB. Try a shorter clip.", "error");
                return;
            }

            showStatus("Checking sound...");

            try {
                const ctx = getSoundCtx();

                if (!ctx) {
                    throw new Error("no audio");
                }

                /* Make sure the browser can actually play it */
                await ctx.decodeAudioData(await file.arrayBuffer());

                const id = `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
                const name = file.name.replace(/\.[^.]+$/, "").slice(0, 40) || "My sound";

                await soundDB("readwrite", (store) => store.put(file, id));
                setSoundLibrary([...getSoundLibrary(), { id, name }]);

                renderList();
                refreshSelects();
                showStatus(`Added "${name}". Pick it in any sound list above.`);
            } catch (error) {
                showStatus("Couldn't read that file as a sound. Try an .mp3, .wav or .ogg.", "error");
            }
        });

        list.addEventListener("click", async (event) => {
            const button = event.target.closest("button[data-action]");
            const item = button && button.closest("[data-sound-id]");

            if (!item) {
                return;
            }

            const id = item.dataset.soundId;

            if (button.dataset.action === "play") {
                playSoundValue(`upload:${id}`, Number(volume.value) / 100);
                return;
            }

            /* v1.6.3: a saved theme still uses it: keep the file (loading that theme puts it back in your list) */
            let keptForTheme = false;
            try { keptForTheme = themeSoundIdsInUse().has(id); } catch (error) { /* themes not ready */ }

            if (!keptForTheme) {
                try {
                    await soundDB("readwrite", (store) => store.delete(id));
                } catch (error) {
                    /* Already gone: still remove it from the list */
                }
            }

            soundBufferCache.delete(id);
            setSoundLibrary(getSoundLibrary().filter((s) => s.id !== id));
            renderList();
            refreshSelects();   /* events using it fall back to their default sound */
            preview();
            showStatus(keptForTheme ? "Sound removed. A saved theme still uses it, so it comes back when you load that theme." : "Sound removed.");
        });

        return {
            save() {
                writeSoundSettings(readInputs());
                applySavedSounds();
            },
            reset() {
                const st = defaultSoundSettings();
                fill(st);
                writeSoundSettings(st);
                applySavedSounds();
            }
        };
    }


    /* =========================================================
       REFERENCE IMAGES WINDOW
       A floating window for reference pictures, opened from the
       bottom bar (next to the flower). Images are kept only in
       this browser (IndexedDB) and never touch FlockMod's board or
       servers. Only the current picture is on screen; zoom and pan
       only move/scale it (graphics card), and nothing runs while
       you aren't touching it. Built as a normal FlockMod-style
       popup, so it takes your popup colors automatically.
       ========================================================= */

    const REF_SELECTOR = '.dialog[name="themeModReference"]';
    const REF_BUTTON_SELECTOR = ".themeModRefButton";
    const REF_DB_NAME = "flockmodThemeModRefs";
    const REF_DB_STORE = "images";
    const REF_LIST_LS = "flockmodRefList";
    const REF_INDEX_LS = "flockmodRefIndex";
    const REF_RECT_LS = "flockmodRefRect";
    const REF_VIEW_LS = "flockmodRefView";
    const REF_BOARD_LS = "flockmodRefBoard";   /* v1.6.2: Board view layout */
    const REF_BOARD_SIDE = 1280;               /* board copies are this size at most */
    const REF_MAX_IMAGES = 20;
    const REF_MAX_SIDE = 2560;
    const REF_THUMB_SIDE = 120;
    const REF_MAX_FILE_BYTES = 30 * 1024 * 1024;

    /* Hanging picture frame with a sakura inside (FlockMod already
       uses the plain "image" icon for board uploads) */
    const REF_ICON_SVG = `
        <svg class="themeModRefIcon" viewBox="0 0 24 24" aria-hidden="true" style="fill: currentColor;">
            <path d="M8 8 L12 3.2 L16 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
            <circle cx="12" cy="3" r="1.3"/>
            <rect x="3" y="8" width="18" height="13.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/>
            <g transform="translate(12 14.9)">
                <ellipse cx="0" cy="-2.3" rx="1.7" ry="2.1"/>
                <ellipse cx="0" cy="-2.3" rx="1.7" ry="2.1" transform="rotate(72)"/>
                <ellipse cx="0" cy="-2.3" rx="1.7" ry="2.1" transform="rotate(144)"/>
                <ellipse cx="0" cy="-2.3" rx="1.7" ry="2.1" transform="rotate(216)"/>
                <ellipse cx="0" cy="-2.3" rx="1.7" ry="2.1" transform="rotate(288)"/>
            </g>
        </svg>`;

    function openRefDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(REF_DB_NAME, 1);
            request.onupgradeneeded = () => request.result.createObjectStore(REF_DB_STORE);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function refDB(mode, action) {
        const db = await openRefDB();

        try {
            return await new Promise((resolve, reject) => {
                const tx = db.transaction(REF_DB_STORE, mode);
                const request = action(tx.objectStore(REF_DB_STORE));
                tx.oncomplete = () => resolve(request ? request.result : undefined);
                tx.onerror = () => reject(tx.error);
            });
        } finally {
            db.close();
        }
    }

    function getRefList() {
        try {
            const list = JSON.parse(localStorage.getItem(REF_LIST_LS) || "[]");
            return Array.isArray(list) ? list.filter((id) => typeof id === "string") : [];
        } catch (error) {
            return [];
        }
    }

    function setRefList(list) {
        localStorage.setItem(REF_LIST_LS, JSON.stringify(list));
    }

    function readRefView() {
        try {
            const v = JSON.parse(localStorage.getItem(REF_VIEW_LS) || "{}");
            return {
                flip: Boolean(v.flip),
                gray: Boolean(v.gray),
                opacity: Number.isFinite(v.opacity) ? Math.min(100, Math.max(30, v.opacity)) : 100,
                strip: Boolean(v.strip),
                board: Boolean(v.board)
            };
        } catch (error) {
            return { flip: false, gray: false, opacity: 100, strip: false, board: false };
        }
    }

    /* v1.6.2 Board view: where each image sits (board units) + the board's pan/zoom */
    function readRefBoard() {
        try {
            const b = JSON.parse(localStorage.getItem(REF_BOARD_LS) || "{}");
            const v = b.v || {};
            return {
                v: {
                    x: Number.isFinite(v.x) ? v.x : 20,
                    y: Number.isFinite(v.y) ? v.y : 20,
                    s: Number.isFinite(v.s) ? Math.min(4, Math.max(0.05, v.s)) : 1
                },
                items: b.items && typeof b.items === "object" ? b.items : {},
                z: Number.isFinite(b.z) ? b.z : 1
            };
        } catch (error) {
            return { v: { x: 20, y: 20, s: 1 }, items: {}, z: 1 };
        }
    }

    function saveRefBoard(board) {
        try {
            localStorage.setItem(REF_BOARD_LS, JSON.stringify(board));
        } catch (error) {
            /* storage full: the layout just isn't remembered */
        }
    }

    function saveRefView(view) {
        localStorage.setItem(REF_VIEW_LS, JSON.stringify(view));
    }

    /* Shrinks big pictures once, when they're added, so memory and
       storage stay reasonable. Returns { full, thumb } blobs. */
    async function prepareRefImage(file) {
        if (!file || !/^image\//.test(file.type)) {
            throw new Error("not an image");
        }

        if (file.size > REF_MAX_FILE_BYTES) {
            throw new Error("too big");
        }

        const bitmap = await createImageBitmap(file);

        const draw = (maxSide, type, quality) => {
            const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
            const canvas = document.createElement("canvas");
            canvas.width = Math.max(1, Math.round(bitmap.width * scale));
            canvas.height = Math.max(1, Math.round(bitmap.height * scale));
            const g = canvas.getContext("2d");
            g.imageSmoothingQuality = "high";
            g.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
            return canvasToBlob(canvas, type, quality);
        };

        try {
            const full = (await draw(REF_MAX_SIDE, "image/webp", 0.92)) || (await draw(REF_MAX_SIDE, "image/png"));
            const thumb = (await draw(REF_THUMB_SIDE, "image/webp", 0.8)) || (await draw(REF_THUMB_SIDE, "image/png"));
            return { full, thumb };
        } finally {
            bitmap.close();
        }
    }

    /* Keeps the reference window above FlockMod's other popups
       when you use it, but always under the mod menu */
    function raiseRefWindow(win) {
        let top = 0;

        document.querySelectorAll(".dialog").forEach((d) => {
            if (d !== win && d.getAttribute("name") !== "themeModMenu") {
                const z = parseInt(getComputedStyle(d).zIndex, 10);

                if (Number.isFinite(z)) {
                    top = Math.max(top, z);
                }
            }
        });

        win.style.zIndex = String(Math.min(99990, Math.max(1000, top + 1)));
    }

    function getInitialRefRect() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let r = null;

        try {
            r = JSON.parse(localStorage.getItem(REF_RECT_LS) || "null");
        } catch (error) {
            r = null;
        }

        let width = r && Number(r.width) ? r.width : Math.min(420, vw * 0.4);
        let height = r && Number(r.height) ? r.height : Math.min(460, vh * 0.6);
        width = Math.max(240, Math.min(width, vw - 20));
        height = Math.max(200, Math.min(height, vh - 20));

        let left = r && Number.isFinite(r.left) ? r.left : vw - width - 80;
        let top = r && Number.isFinite(r.top) ? r.top : 80;
        left = Math.max(0, Math.min(left, vw - width));
        top = Math.max(0, Math.min(top, vh - 40));

        return {
            width: `${Math.round(width)}px`,
            height: `${Math.round(height)}px`,
            left: `${Math.round(left)}px`,
            top: `${Math.round(top)}px`
        };
    }

    function toggleRefWindow() {
        const existing = document.querySelector(REF_SELECTOR);

        if (existing) {
            existing._closeRef();
            return;
        }

        createRefWindow();
    }

    function createRefWindow() {
        const container = document.querySelector("#dialogContainer");

        if (!container) {
            return null;
        }

        const win = document.createElement("div");
        win.className = "dialog dialogVisible themeModRefWindow";
        win.setAttribute("name", "themeModReference");
        Object.assign(win.style, getInitialRefRect());

        win.innerHTML = `
            <div class="themeModRefInner">
                <div class="dialogTitlebar movable">
                    <div class="dialogTitle">
                        <div class="pull-left">
                            ${REF_ICON_SVG}
                            <span>References</span>
                            <span class="themeModRefCount"></span>
                        </div>
                        <div class="dialogTitleButtons">
                            <div style="text-align: right;">
                                <a href="#" class="btn btn-md themeModRefHelp" title="How to use the reference window">
                                    <i class="fas fa-info-circle titleButton"></i>
                                </a>
                                <a href="#" class="btn btn-md themeModRefMinimize" title="Minimize">
                                    <i class="fas fa-window-minimize titleButton"></i>
                                </a>
                                <a href="#" class="btn btn-md closeButton" title="Close">
                                    <i class="fas fa-window-close titleButton"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="themeModRefToolbar">
                    <button type="button" class="btn btn-default themeModRefBtn" data-ref="add" title="Add images (you can also drop or paste them)"><i class="fas fa-plus"></i></button>
                    <span class="themeModRefSeg" role="radiogroup" aria-label="View">
                        <button type="button" class="btn btn-default themeModRefBtn" data-ref="single" role="radio" title="One image at a time">Single</button>
                        <button type="button" class="btn btn-default themeModRefBtn" data-ref="board" role="radio" title="All images on one board">Board</button>
                    </span>
                    <span class="themeModRefSep"></span>
                    <button type="button" class="btn btn-default themeModRefBtn" data-ref="zoomOut" title="Zoom out"><i class="fas fa-search-minus"></i></button>
                    <button type="button" class="btn btn-default themeModRefBtn themeModRefZoom" data-ref="fit" title="Fit to window">100%</button>
                    <button type="button" class="btn btn-default themeModRefBtn" data-ref="zoomIn" title="Zoom in"><i class="fas fa-search-plus"></i></button>
                    <button type="button" class="btn btn-default themeModRefBtn themeModRefBoardOnly" data-ref="tidy" title="Tidy: lay the images out in neat rows again"><i class="fas fa-th"></i></button>
                    <span class="themeModRefSep"></span>
                    <button type="button" class="btn btn-default themeModRefBtn" data-ref="flip" title="Flip horizontally"><i class="fas fa-arrows-alt-h"></i></button>
                    <button type="button" class="btn btn-default themeModRefBtn" data-ref="gray" title="Grayscale (check values)"><i class="fas fa-adjust"></i></button>
                    <input type="range" class="themeModRefOpacity" min="30" max="100" step="5" title="Window opacity">
                    <span class="themeModRefGrow"></span>
                    <button type="button" class="btn btn-default themeModRefBtn" data-ref="strip" title="Show all images"><i class="fas fa-th-large"></i></button>
                    <button type="button" class="btn btn-default themeModRefBtn" data-ref="remove" title="Remove this image"><i class="fas fa-trash-alt"></i></button>
                </div>

                <div class="themeModRefStage" tabindex="0">
                    <div class="themeModRefLayer">
                        <img class="themeModRefImg" alt="" draggable="false">
                    </div>
                    <div class="themeModRefBoard">
                        <div class="themeModRefWorld"></div>
                    </div>
                    <div class="themeModRefEmpty">
                        ${REF_ICON_SVG}
                        <div>Add reference images with <b>+</b>,<br>drop them here, or paste (Ctrl+V).</div>
                        <div class="themeModRefEmptyNote">Saved only in this browser. Nobody else sees them.</div>
                    </div>
                    <button type="button" class="themeModRefNav themeModRefPrev" data-ref="prev" title="Previous"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="themeModRefNav themeModRefNext" data-ref="next" title="Next"><i class="fas fa-chevron-right"></i></button>
                    <div class="themeModRefToast"></div>
                </div>

                <div class="themeModRefStrip"></div>

                <input type="file" class="themeModRefFile" accept="image/*" multiple style="display: none;">
            </div>

            <div class="dialogSize dsBar sbTop"></div>
            <div class="dialogSize dsBar sbBottom"></div>
            <div class="dialogSize dsBar sbLeft"></div>
            <div class="dialogSize dsBar sbRight"></div>
            <div class="dialogSize dsCorner sbTopLeft"></div>
            <div class="dialogSize dsCorner sbTopRight"></div>
            <div class="dialogSize dsCorner sbBottomLeft"></div>
            <div class="dialogSize dsCorner sbBottomRight"></div>
        `;

        container.appendChild(win);
        raiseRefWindow(win);
        setupDragging(win);
        setupResizing(win, 240, 200);

        const q = (sel) => win.querySelector(sel);
        const stage = q(".themeModRefStage");
        const layer = q(".themeModRefLayer");
        const img = q(".themeModRefImg");
        const empty = q(".themeModRefEmpty");
        const strip = q(".themeModRefStrip");
        const fileInput = q(".themeModRefFile");
        const zoomLabel = q(".themeModRefZoom");
        const countLabel = q(".themeModRefCount");
        const toast = q(".themeModRefToast");
        const opacity = q(".themeModRefOpacity");
        const removeBtn = q('[data-ref="remove"]');
        const world = q(".themeModRefWorld");

        let list = getRefList();
        let index = Math.min(Math.max(0, Number(localStorage.getItem(REF_INDEX_LS)) || 0), Math.max(0, list.length - 1));
        let view = readRefView();
        let currentURL = null;
        let thumbURLs = [];
        let natW = 0;
        let natH = 0;
        let fitted = true;
        const t = { s: 1, x: 0, y: 0 };
        let frame = 0;
        let resizeObserver = null;

        /* ---------- view transform ---------- */

        function render() {
            frame = 0;
            img.style.transform = `translate(${t.x}px, ${t.y}px) scale(${t.s})`;
            zoomLabel.textContent = `${Math.round(t.s * 100)}%`;
        }

        function schedule() {
            if (!frame) {
                frame = requestAnimationFrame(render);
            }
        }

        function stageSize() {
            return { w: stage.clientWidth, h: stage.clientHeight };
        }

        function fit() {
            if (!natW) {
                return;
            }

            const { w, h } = stageSize();
            t.s = Math.min(w / natW, h / natH, 4);
            t.x = (w - natW * t.s) / 2;
            t.y = (h - natH * t.s) / 2;
            fitted = true;
            schedule();
        }

        /* Zoom keeping the point (px, py) of the stage in place */
        function zoomAt(factor, px, py) {
            if (!natW) {
                return;
            }

            const s = Math.min(16, Math.max(0.05, t.s * factor));
            const k = s / t.s;
            t.x = px - (px - t.x) * k;
            t.y = py - (py - t.y) * k;
            t.s = s;
            fitted = false;
            schedule();
        }

        /* Stage point under the pointer. With flip on, the layer is
           mirrored, so x is measured from the other side. */
        function localPoint(clientX, clientY) {
            const r = stage.getBoundingClientRect();
            const x = clientX - r.left;
            return { x: view.flip ? r.width - x : x, y: clientY - r.top };
        }

        /* ---------- showing images ---------- */

        function showToast(message) {
            toast.textContent = message;
            toast.classList.add("visible");
            clearTimeout(toast._timer);
            toast._timer = setTimeout(() => toast.classList.remove("visible"), 2600);
        }

        function updateChrome() {
            const has = list.length > 0;
            empty.style.display = has ? "none" : "";
            img.style.display = has ? "" : "none";
            win.classList.toggle("themeModRefMulti", list.length > 1);
            countLabel.textContent = !has ? "" : view.board ? `${list.length} image${list.length > 1 ? "s" : ""}` : `${index + 1} / ${list.length}`;
            win.classList.toggle("themeModRefBoardOn", view.board);
            q('[data-ref="single"]').classList.toggle("active", !view.board);
            q('[data-ref="board"]').classList.toggle("active", view.board);
            q('[data-ref="single"]').setAttribute("aria-checked", String(!view.board));
            q('[data-ref="board"]').setAttribute("aria-checked", String(view.board));
            world.classList.toggle("themeModRefGray", view.gray);
            removeBtn.disabled = !has;
            layer.style.transform = view.flip ? "scaleX(-1)" : "";
            img.style.filter = view.gray ? "grayscale(1)" : "";
            win.style.opacity = String(view.opacity / 100);
            opacity.value = String(view.opacity);
            q('[data-ref="flip"]').classList.toggle("active", view.flip);
            q('[data-ref="gray"]').classList.toggle("active", view.gray);
            q('[data-ref="strip"]').classList.toggle("active", view.strip);
            win.classList.toggle("themeModRefStripOpen", view.strip && has);
        }

        async function showCurrent() {
            if (currentURL) {
                URL.revokeObjectURL(currentURL);
                currentURL = null;
            }

            natW = 0;
            updateChrome();

            if (!list.length) {
                img.removeAttribute("src");
                renderStrip();
                return;
            }

            localStorage.setItem(REF_INDEX_LS, String(index));
            const id = list[index];
            let blob = null;

            try {
                blob = await refDB("readonly", (store) => store.get(id));
            } catch (error) {
                blob = null;
            }

            if (!blob || id !== list[index]) {
                return;
            }

            currentURL = URL.createObjectURL(blob);
            img.onload = () => {
                natW = img.naturalWidth;
                natH = img.naturalHeight;
                fit();
            };
            img.src = currentURL;
            markStrip();
        }

        function go(step) {
            if (list.length < 2) {
                return;
            }

            index = (index + step + list.length) % list.length;
            showCurrent();
        }

        /* ---------- thumbnail strip (hidden behind a button) ---------- */

        async function renderStrip() {
            thumbURLs.forEach((u) => URL.revokeObjectURL(u));
            thumbURLs = [];
            strip.innerHTML = "";

            if (!view.strip || !list.length) {
                return;
            }

            for (let i = 0; i < list.length; i++) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "themeModRefThumb";
                button.dataset.index = String(i);
                button.title = `Image ${i + 1}`;
                strip.appendChild(button);
            }

            markStrip();

            /* Thumbnails are small separate copies, so opening the
               strip never loads the full-size pictures */
            for (let i = 0; i < list.length; i++) {
                try {
                    const blob = await refDB("readonly", (store) => store.get(`${list[i]}_t`));
                    const button = strip.children[i];

                    if (blob && button) {
                        const url = URL.createObjectURL(blob);
                        thumbURLs.push(url);
                        button.style.backgroundImage = `url("${url}")`;
                    }
                } catch (error) {
                    /* missing thumbnail: leave the square blank */
                }
            }
        }

        function markStrip() {
            [...strip.children].forEach((el, i) => el.classList.toggle("current", i === index));
        }

        strip.addEventListener("click", (event) => {
            const button = event.target.closest(".themeModRefThumb");

            if (button) {
                index = Number(button.dataset.index);
                showCurrent();
            }
        });

        /* ---------- adding / removing ---------- */

        async function addFiles(files) {
            const images = [...files].filter((f) => f && /^image\//.test(f.type));

            if (!images.length) {
                showToast("Those weren't images.");
                return;
            }

            const room = REF_MAX_IMAGES - list.length;

            if (room <= 0) {
                showToast(`You can keep up to ${REF_MAX_IMAGES} images. Remove one to add more.`);
                return;
            }

            showToast(images.length > 1 ? `Adding ${Math.min(room, images.length)} images...` : "Adding image...");

            let added = 0;
            let failed = 0;

            for (const file of images.slice(0, room)) {
                try {
                    const { full, thumb } = await prepareRefImage(file);
                    const id = `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
                    await refDB("readwrite", (store) => {
                        store.put(thumb, `${id}_t`);
                        return store.put(full, id);
                    });
                    list.push(id);
                    added++;
                } catch (error) {
                    failed++;
                }
            }

            setRefList(list);

            if (added) {
                index = list.length - 1;
                await showCurrent();
                renderStrip();

                if (view.board) {
                    boardOpen();
                }
            }

            let message = added ? `Added ${added} image${added > 1 ? "s" : ""}.` : "";

            if (failed) {
                message += ` ${failed} couldn't be read.`;
            }

            if (images.length > room) {
                message += ` Only ${REF_MAX_IMAGES} images fit, so ${images.length - room} were skipped.`;
            }

            showToast(message.trim());
        }

        let removeArmed = 0;

        async function removeCurrent() {
            if (!list.length) {
                return;
            }

            /* Two taps, so a stray click can't delete a reference */
            if (Date.now() - removeArmed > 2500) {
                removeArmed = Date.now();
                removeBtn.classList.add("themeModRefArmed");
                showToast("Tap the trash again to remove this image.");
                setTimeout(() => removeBtn.classList.remove("themeModRefArmed"), 2500);
                return;
            }

            removeArmed = 0;
            removeBtn.classList.remove("themeModRefArmed");

            const id = list[index];

            try {
                await refDB("readwrite", (store) => {
                    store.delete(`${id}_t`);
                    store.delete(`${id}_b`);
                    return store.delete(id);
                });
            } catch (error) {
                /* already gone */
            }

            list.splice(index, 1);
            setRefList(list);
            index = Math.min(index, Math.max(0, list.length - 1));
            await showCurrent();
            renderStrip();
            showToast("Image removed.");
        }

        /* ---------- toolbar ---------- */

        win.addEventListener("click", (event) => {
            const button = event.target.closest("[data-ref]");

            if (!button || !win.contains(button)) {
                return;
            }

            const { w, h } = stageSize();

            switch (button.dataset.ref) {
                case "add": fileInput.click(); break;
                case "zoomIn": if (view.board) boardZoomAt(1.25, w / 2, h / 2); else zoomAt(1.25, w / 2, h / 2); break;
                case "zoomOut": if (view.board) boardZoomAt(0.8, w / 2, h / 2); else zoomAt(0.8, w / 2, h / 2); break;
                case "fit": if (view.board) boardFitAll(); else fit(); break;
                case "single": setBoardMode(false); break;
                case "board": setBoardMode(true); break;
                case "tidy": boardTidy(); boardFitAll(); boardSaveSoon(); break;
                case "flip": view.flip = !view.flip; saveRefView(view); updateChrome(); break;
                case "gray": view.gray = !view.gray; saveRefView(view); updateChrome(); break;
                case "strip": view.strip = !view.strip; saveRefView(view); updateChrome(); renderStrip(); break;
                case "remove": removeCurrent(); break;
                case "prev": go(-1); break;
                case "next": go(1); break;
                default: break;
            }
        });

        opacity.addEventListener("input", () => {
            view.opacity = Number(opacity.value);
            win.style.opacity = String(view.opacity / 100);
        });

        opacity.addEventListener("change", () => saveRefView(view));

        fileInput.addEventListener("change", () => {
            const files = fileInput.files ? [...fileInput.files] : [];
            fileInput.value = "";

            if (files.length) {
                addFiles(files);
            }
        });

        /* ---------- mouse, touch and pen ---------- */

        const pointers = new Map();
        let pinch = null;
        let lastTap = { time: 0, x: 0, y: 0 };

        stage.addEventListener("pointerdown", (event) => {
            if (view.board || event.target.closest(".themeModRefNav") || !list.length) {
                return;
            }

            stage.focus({ preventScroll: true });
            stage.setPointerCapture(event.pointerId);
            pointers.set(event.pointerId, localPoint(event.clientX, event.clientY));

            if (pointers.size === 2) {
                const [a, b] = [...pointers.values()];
                pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
            }

            /* Double tap / double click = fit (or 100% if already fitted) */
            const now = Date.now();
            const p = pointers.get(event.pointerId);

            if (pointers.size === 1 && now - lastTap.time < 320 && Math.hypot(p.x - lastTap.x, p.y - lastTap.y) < 30) {
                if (fitted) {
                    zoomAt(1 / t.s, p.x, p.y);
                } else {
                    fit();
                }
                lastTap.time = 0;
            } else if (pointers.size === 1) {
                lastTap = { time: now, x: p.x, y: p.y };
            }

            stage.classList.add("themeModRefGrabbing");
            event.preventDefault();
        });

        stage.addEventListener("pointermove", (event) => {
            if (!pointers.has(event.pointerId)) {
                return;
            }

            const prev = pointers.get(event.pointerId);
            const p = localPoint(event.clientX, event.clientY);
            pointers.set(event.pointerId, p);

            if (pointers.size >= 2 && pinch) {
                const [a, b] = [...pointers.values()];
                const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
                const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

                t.x += mid.x - pinch.mid.x;
                t.y += mid.y - pinch.mid.y;
                zoomAt(dist / pinch.dist, mid.x, mid.y);
                pinch = { dist, mid };
            } else if (pointers.size === 1) {
                t.x += p.x - prev.x;
                t.y += p.y - prev.y;
                fitted = false;
                schedule();
            }
        });

        const endPointer = (event) => {
            pointers.delete(event.pointerId);

            if (pointers.size < 2) {
                pinch = null;
            }

            if (!pointers.size) {
                stage.classList.remove("themeModRefGrabbing");
            }
        };

        stage.addEventListener("pointerup", endPointer);
        stage.addEventListener("pointercancel", endPointer);

        /* Wheel = zoom at the cursor (trackpad pinch sends this too) */
        stage.addEventListener("wheel", (event) => {
            event.preventDefault();

            if (!list.length || view.board) {
                return;
            }

            const p = localPoint(event.clientX, event.clientY);
            const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
            zoomAt(Math.exp(-delta * 0.0015), p.x, p.y);
        }, { passive: false });

        /* ---------- drop + paste ---------- */

        stage.addEventListener("dragover", (event) => {
            if (event.dataTransfer && [...event.dataTransfer.types].includes("Files")) {
                event.preventDefault();
                stage.classList.add("themeModRefDropping");
            }
        });

        stage.addEventListener("dragleave", () => stage.classList.remove("themeModRefDropping"));

        stage.addEventListener("drop", (event) => {
            stage.classList.remove("themeModRefDropping");

            if (event.dataTransfer && event.dataTransfer.files.length) {
                event.preventDefault();
                event.stopPropagation();
                addFiles(event.dataTransfer.files);
            }
        });

        /* Only while this window is focused, so FlockMod's own
           "paste an image onto the board" keeps working elsewhere */
        win.addEventListener("paste", (event) => {
            const files = event.clipboardData ? [...event.clipboardData.files] : [];

            if (files.length) {
                event.preventDefault();
                event.stopPropagation();
                addFiles(files);
            }
        });

        /* Keys while the picture is focused (the keyboard shield keeps
           them away from FlockMod's hotkeys) */
        stage.addEventListener("themeModRefKey", (event) => {
            const { w, h } = stageSize();
            const key = event.detail.key;

            if (view.board) {
                if (key === "+" || key === "=") boardZoomAt(1.25, w / 2, h / 2);
                else if (key === "-") boardZoomAt(0.8, w / 2, h / 2);
                else if (key === "0") boardFitAll();
                return;
            }

            if (key === "ArrowLeft") go(-1);
            else if (key === "ArrowRight") go(1);
            else if (key === "+" || key === "=") zoomAt(1.25, w / 2, h / 2);
            else if (key === "-") zoomAt(0.8, w / 2, h / 2);
            else if (key === "0") fit();
        });

        /* ---------- Board view (v1.6.2, PureRef-style) ----------
           Every image on one board you can pan and zoom. Speed: the
           whole board moves with ONE transform, a dragged image only
           changes its own position, and updates wait for the next
           frame. Images use a smaller "board copy" (made once, saved),
           so 20 big pictures don't fill up memory. */
        const boardEl = q(".themeModRefBoard");
        const board = readRefBoard();
        const boardEls = new Map();      /* id -> { el, img } */
        const boardURLs = new Map();     /* id -> object URL */
        const boardDirty = new Set();
        let boardWorldDirty = true;
        let boardFrame = 0;
        let boardSel = null;
        let boardSaveTimer = 0;
        let boardLoadToken = 0;

        function boardSelColor() {
            /* Selection follows your Selected color when you set one, else sakura pink */
            const on = localStorage.getItem("flockmodCustomSelectedColorEnabled") !== "false";
            const c = (localStorage.getItem("flockmodCustomSelectedColor") || "").toLowerCase();
            win.style.setProperty("--fm-ref-sel", on && /^#[0-9a-f]{6}$/.test(c) && c !== "#4f5156" ? c : "#f48fb1");
        }

        function boardPaint() {
            boardFrame = 0;

            if (boardWorldDirty) {
                const v = board.v;
                world.style.transform = `translate(${v.x}px, ${v.y}px) scale(${v.s})`;
                world.style.setProperty("--fm-ref-inv", String(1 / v.s));
                zoomLabel.textContent = `${Math.round(v.s * 100)}%`;
                boardWorldDirty = false;
            }

            boardDirty.forEach((id) => {
                const it = board.items[id];
                const e = boardEls.get(id);

                if (!it || !e) {
                    return;
                }

                e.el.style.transform = `translate(${it.x}px, ${it.y}px)`;
                e.el.style.width = `${it.w}px`;
                e.el.style.height = `${it.h}px`;
                e.el.style.zIndex = String(it.z || 1);
                e.el.classList.toggle("themeModRefItemFlip", Boolean(it.flip));
            });
            boardDirty.clear();
        }

        function boardSchedule(id) {
            if (id) boardDirty.add(id);
            else boardWorldDirty = true;

            if (!boardFrame) {
                boardFrame = requestAnimationFrame(boardPaint);
            }
        }

        function boardSaveSoon() {
            clearTimeout(boardSaveTimer);
            boardSaveTimer = setTimeout(() => {
                /* forget images that were removed */
                Object.keys(board.items).forEach((id) => { if (!list.includes(id)) delete board.items[id]; });
                saveRefBoard(board);
            }, 400);
        }

        /* A smaller copy for the board, made once and kept */
        async function boardBlob(id) {
            let blob = await refDB("readonly", (store) => store.get(`${id}_b`)).catch(() => null);

            if (blob) {
                return blob;
            }

            const full = await refDB("readonly", (store) => store.get(id)).catch(() => null);

            if (!full) {
                return null;
            }

            try {
                const bmp = await createImageBitmap(full);
                const k = Math.min(1, REF_BOARD_SIDE / Math.max(bmp.width, bmp.height));

                if (k >= 1) {
                    bmp.close?.();
                    return full;   /* already small */
                }

                const canvas = document.createElement("canvas");
                canvas.width = Math.round(bmp.width * k);
                canvas.height = Math.round(bmp.height * k);
                canvas.getContext("2d").drawImage(bmp, 0, 0, canvas.width, canvas.height);
                bmp.close?.();
                blob = await new Promise((res) => canvas.toBlob(res, "image/webp", 0.9));

                if (blob) {
                    await refDB("readwrite", (store) => store.put(blob, `${id}_b`)).catch(() => {});
                    return blob;
                }
            } catch (error) {
                /* fall back to the full picture */
            }

            return full;
        }

        function boardMakeItem(id) {
            const el = document.createElement("div");
            el.className = "themeModRefItem";
            el.dataset.id = id;
            el.innerHTML =
                '<img alt="" draggable="false" decoding="async">' +
                '<span class="themeModRefHandle" title="Drag to resize (Shift = free)"></span>' +
                '<div class="themeModRefMenu">' +
                '<button type="button" data-board="front" title="Bring to front"><i class="fas fa-layer-group"></i></button>' +
                '<button type="button" data-board="size" title="Reset size"><i class="fas fa-compress"></i></button>' +
                '<button type="button" data-board="flip" title="Flip"><i class="fas fa-arrows-alt-h"></i></button>' +
                '<button type="button" data-board="open" title="Open in Single view"><i class="fas fa-expand"></i></button>' +
                '<button type="button" data-board="remove" title="Remove this image"><i class="fas fa-trash-alt"></i></button>' +
                "</div>";
            world.appendChild(el);
            const entry = { el, img: el.querySelector("img") };
            boardEls.set(id, entry);
            return entry;
        }

        function boardTidy() {
            const rowW = Math.max(600, (stage.clientWidth || 600) * 1.6);
            const gap = 24;
            let x = 0;
            let y = 0;
            let rowH = 0;

            list.forEach((id) => {
                const it = board.items[id];

                if (!it) return;

                const h = 220;
                const w = Math.round(h * (it.r || 1));

                if (x > 0 && x + w > rowW) {
                    x = 0;
                    y += rowH + gap;
                    rowH = 0;
                }

                Object.assign(it, { x, y, w, h });
                x += w + gap;
                rowH = Math.max(rowH, h);
                boardSchedule(id);
            });
        }

        function boardFitAll() {
            const items = list.map((id) => board.items[id]).filter((it) => it && it.w);

            if (!items.length) {
                return;
            }

            const minX = Math.min(...items.map((i) => i.x));
            const minY = Math.min(...items.map((i) => i.y));
            const maxX = Math.max(...items.map((i) => i.x + i.w));
            const maxY = Math.max(...items.map((i) => i.y + i.h));
            const { w, h } = stageSize();
            const pad = 24;
            const s = Math.min(4, Math.max(0.05, Math.min((w - pad * 2) / (maxX - minX || 1), (h - pad * 2) / (maxY - minY || 1))));

            board.v.s = s;
            board.v.x = (w - (maxX - minX) * s) / 2 - minX * s;
            board.v.y = (h - (maxY - minY) * s) / 2 - minY * s;
            boardSchedule();
            boardSaveSoon();
        }

        function boardZoomAt(factor, px, py) {
            const v = board.v;
            const s = Math.min(4, Math.max(0.05, v.s * factor));
            v.x = px - (px - v.x) * (s / v.s);
            v.y = py - (py - v.y) * (s / v.s);
            v.s = s;
            boardSchedule();
            boardSaveSoon();
        }

        function boardSelect(id) {
            if (boardSel && boardEls.get(boardSel)) {
                boardEls.get(boardSel).el.classList.remove("themeModRefItemSel");
            }

            boardSel = id && boardEls.get(id) ? id : null;

            if (boardSel) {
                boardEls.get(boardSel).el.classList.add("themeModRefItemSel");
            }
        }

        function boardFront(id) {
            const it = board.items[id];

            if (it && it.z !== board.z) {
                it.z = ++board.z;
                boardSchedule(id);
            }
        }

        function boardClear() {
            boardLoadToken++;
            boardURLs.forEach((u) => URL.revokeObjectURL(u));
            boardURLs.clear();
            boardEls.clear();
            world.innerHTML = "";
            boardSel = null;
        }

        /* Builds the board from the saved layout; new images get a spot */
        async function boardOpen() {
            const token = ++boardLoadToken;
            boardSelColor();
            const firstTime = !list.some((id) => board.items[id] && board.items[id].w);
            const fresh = [];

            for (const id of list) {
                if (token !== boardLoadToken) return;

                if (boardEls.has(id)) continue;

                const entry = boardMakeItem(id);
                const blob = await boardBlob(id);

                if (token !== boardLoadToken) return;
                if (!blob) continue;

                const url = URL.createObjectURL(blob);
                boardURLs.set(id, url);
                entry.img.src = url;

                if (!board.items[id] || !board.items[id].w) {
                    await entry.img.decode().catch(() => {});
                    const r = entry.img.naturalWidth && entry.img.naturalHeight ? entry.img.naturalWidth / entry.img.naturalHeight : 1;
                    board.items[id] = { x: 0, y: 0, w: 0, h: 0, r, z: ++board.z, flip: false };
                    fresh.push(id);
                }

                boardSchedule(id);
            }

            /* images removed elsewhere */
            [...boardEls.keys()].forEach((id) => {
                if (!list.includes(id)) {
                    boardEls.get(id).el.remove();
                    boardEls.delete(id);
                    URL.revokeObjectURL(boardURLs.get(id));
                    boardURLs.delete(id);
                }
            });

            if (firstTime) {
                boardTidy();
                boardFitAll();
            } else if (fresh.length) {
                /* new ones land in the middle of what you're looking at */
                const { w, h } = stageSize();
                const v = board.v;
                fresh.forEach((id, i) => {
                    const it = board.items[id];
                    it.h = 220;
                    it.w = Math.round(220 * it.r);
                    it.x = (w / 2 - v.x) / v.s - it.w / 2 + i * 24;
                    it.y = (h / 2 - v.y) / v.s - it.h / 2 + i * 24;
                    boardSchedule(id);
                });
                boardSelect(fresh[fresh.length - 1]);
            }

            boardSchedule();
            boardSaveSoon();
        }

        function setBoardMode(on) {
            if (view.board === on) {
                return;
            }

            view.board = on;
            saveRefView(view);
            updateChrome();

            if (on) {
                boardOpen();
            } else {
                boardClear();
                showCurrent();
            }
        }

        /* menu buttons on an image */
        let boardRemoveArmed = { id: null, at: 0 };

        world.addEventListener("click", async (event) => {
            const button = event.target.closest("[data-board]");
            const itemEl = button && button.closest(".themeModRefItem");

            if (!itemEl) {
                return;
            }

            event.stopPropagation();
            const id = itemEl.dataset.id;
            const it = board.items[id];

            switch (button.dataset.board) {
                case "front": boardFront(id); break;
                case "size": it.h = 220; it.w = Math.round(220 * (it.r || 1)); boardSchedule(id); break;
                case "flip": it.flip = !it.flip; boardSchedule(id); break;
                case "open": index = Math.max(0, list.indexOf(id)); setBoardMode(false); return;
                case "remove": {
                    /* two taps, like the trash button */
                    if (boardRemoveArmed.id !== id || Date.now() - boardRemoveArmed.at > 2500) {
                        boardRemoveArmed = { id, at: Date.now() };
                        button.classList.add("themeModRefArmed");
                        showToast("Tap the trash again to remove this image.");
                        setTimeout(() => button.classList.remove("themeModRefArmed"), 2500);
                        return;
                    }

                    boardRemoveArmed = { id: null, at: 0 };

                    try {
                        await refDB("readwrite", (store) => {
                            store.delete(`${id}_t`);
                            store.delete(`${id}_b`);
                            return store.delete(id);
                        });
                    } catch (error) {
                        /* already gone */
                    }

                    list = list.filter((x) => x !== id);
                    setRefList(list);
                    index = Math.min(index, Math.max(0, list.length - 1));
                    delete board.items[id];
                    boardEls.get(id)?.el.remove();
                    boardEls.delete(id);
                    URL.revokeObjectURL(boardURLs.get(id));
                    boardURLs.delete(id);
                    boardSel = null;
                    updateChrome();
                    renderStrip();
                    showToast("Image removed.");
                    break;
                }
                default: break;
            }

            boardSaveSoon();
        });

        /* move / resize an image, pan / pinch the board */
        const boardPointers = new Map();
        let boardDrag = null;
        let boardPinch = null;
        let boardLastDown = null;   /* image under the last press (for double-click) */

        boardEl.addEventListener("pointerdown", (event) => {
            if (!view.board || event.target.closest(".themeModRefMenu")) {
                return;
            }

            stage.focus({ preventScroll: true });
            boardEl.setPointerCapture(event.pointerId);
            boardPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
            event.preventDefault();

            if (boardPointers.size === 2) {
                /* second finger: pinch the board instead */
                const [a, b] = [...boardPointers.values()];
                boardDrag = null;
                boardPinch = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
                return;
            }

            const itemEl = event.target.closest(".themeModRefItem");
            boardLastDown = itemEl ? itemEl.dataset.id : null;

            if (itemEl) {
                const id = itemEl.dataset.id;
                const it = board.items[id];
                boardSelColor();
                boardSelect(id);
                boardFront(id);
                boardDrag = {
                    id, sx: event.clientX, sy: event.clientY,
                    ox: it.x, oy: it.y, ow: it.w, oh: it.h,
                    resize: event.target.classList.contains("themeModRefHandle")
                };
            } else {
                boardSelect(null);
                boardDrag = { pan: true, sx: event.clientX, sy: event.clientY, ox: board.v.x, oy: board.v.y };
                boardEl.classList.add("themeModRefGrabbing");
            }
        });

        boardEl.addEventListener("pointermove", (event) => {
            if (!boardPointers.has(event.pointerId)) {
                return;
            }

            boardPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

            if (boardPinch && boardPointers.size >= 2) {
                const [a, b] = [...boardPointers.values()];
                const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                const r = stage.getBoundingClientRect();
                board.v.x += mx - boardPinch.mx;
                board.v.y += my - boardPinch.my;
                boardZoomAt(dist / boardPinch.dist, mx - r.left, my - r.top);
                boardPinch = { dist, mx, my };
                return;
            }

            const d = boardDrag;

            if (!d) {
                return;
            }

            if (d.pan) {
                board.v.x = d.ox + event.clientX - d.sx;
                board.v.y = d.oy + event.clientY - d.sy;
                boardSchedule();
                return;
            }

            const it = board.items[d.id];
            const dx = (event.clientX - d.sx) / board.v.s;
            const dy = (event.clientY - d.sy) / board.v.s;

            if (d.resize) {
                it.w = Math.max(40, d.ow + dx);
                it.h = event.shiftKey ? Math.max(30, d.oh + dy) : it.w / (it.r || 1);
            } else {
                it.x = d.ox + dx;
                it.y = d.oy + dy;
            }

            boardSchedule(d.id);
        });

        const boardEnd = (event) => {
            boardPointers.delete(event.pointerId);

            if (boardPointers.size < 2) {
                boardPinch = null;
            }

            if (!boardPointers.size) {
                if (boardDrag) boardSaveSoon();
                boardDrag = null;
                boardEl.classList.remove("themeModRefGrabbing");
            }
        };

        boardEl.addEventListener("pointerup", boardEnd);
        boardEl.addEventListener("pointercancel", boardEnd);

        boardEl.addEventListener("wheel", (event) => {
            if (!view.board) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            const r = stage.getBoundingClientRect();
            const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
            boardZoomAt(Math.exp(-delta * 0.0015), event.clientX - r.left, event.clientY - r.top);
        }, { passive: false });

        /* double-click: an image opens in Single view, empty space fits all */
        boardEl.addEventListener("dblclick", (event) => {
            if (event.target.closest(".themeModRefMenu")) {
                return;
            }

            /* pointer capture makes the target the board, so use the last press */
            if (boardLastDown && list.includes(boardLastDown)) {
                index = list.indexOf(boardLastDown);
                setBoardMode(false);
            } else {
                boardFitAll();
            }
        });

        /* ---------- window behaviour ---------- */

        win.addEventListener("pointerdown", () => raiseRefWindow(win), true);

        /* Keep the picture fitted while you resize the window */
        let lastSize = stageSize();
        resizeObserver = new ResizeObserver(() => {
            const size = stageSize();

            if (view.board) {
                lastSize = size;
                return;
            }

            if (fitted) {
                fit();
            } else {
                /* keep the same spot centered */
                t.x += (size.w - lastSize.w) / 2;
                t.y += (size.h - lastSize.h) / 2;
                schedule();
            }

            lastSize = size;
        });
        resizeObserver.observe(stage);

        function saveRect() {
            const rect = {
                width: parseFloat(win.style.width),
                height: parseFloat(win.dataset.fullHeight || win.style.height),
                left: parseFloat(win.style.left),
                top: parseFloat(win.style.top)
            };

            if (Object.values(rect).every(Number.isFinite)) {
                localStorage.setItem(REF_RECT_LS, JSON.stringify(rect));
            }
        }

        q(".themeModRefMinimize").addEventListener("click", (event) => {
            event.preventDefault();
            win._closeTour?.();

            if (win.classList.contains("themeModRefMinimized")) {
                win.classList.remove("themeModRefMinimized");
                win.style.height = `${win.dataset.fullHeight}px`;
                delete win.dataset.fullHeight;
            } else {
                win.dataset.fullHeight = String(win.offsetHeight);
                win.classList.add("themeModRefMinimized");
                win.style.height = `${q(".dialogTitlebar").offsetHeight + 4}px`;
            }
        });

        win._closeRef = () => {
            win._closeTour?.();
            saveRect();
            saveRefView(view);
            resizeObserver.disconnect();
            boardClear();
            thumbURLs.forEach((u) => URL.revokeObjectURL(u));

            if (currentURL) {
                URL.revokeObjectURL(currentURL);
            }

            win.remove();
        };

        q(".closeButton").addEventListener("click", (event) => {
            event.preventDefault();
            win._closeRef();
        });

        showCurrent().then(() => {
            renderStrip();

            if (view.board) {
                boardOpen();
            }
        });

        /* Quick tour: asks the first time, the (i) button replays it */
        setupTour(win, {
            steps: getRefTourSteps(win),
            seenKey: REF_TOUR_SEEN_LS,
            title: "New here?",
            text: "Want a quick look at how the reference window works? It's short.",
            replayButton: ".themeModRefHelp",
            welcomeButton: ".themeModRefHelpWelcome"
        });

        return win;
    }

    const REF_TOUR_SEEN_LS = "flockmodRefTourSeen";

    function getRefTourSteps(win) {
        const el = (selector) => () => win.querySelector(selector);

        /* Un-minimize first so every step has something to point at */
        const open = () => {
            if (win.classList.contains("themeModRefMinimized")) {
                win.classList.remove("themeModRefMinimized");
                win.style.height = `${win.dataset.fullHeight || 360}px`;
                delete win.dataset.fullHeight;
            }
        };

        return [
            {
                icon: "fa-plus",
                title: "Add your references",
                text: "Press + to pick images, or drop them in, or paste one with Ctrl+V. Up to 20, saved only in this browser.",
                before: open,
                target: el('[data-ref="add"]')
            },
            {
                icon: "fa-hand-paper",
                title: "Move and zoom",
                text: "Drag to move the image. Scroll or pinch to zoom, and double-click to fit it back in the window.",
                before: open,
                target: el(".themeModRefStage")
            },
            {
                icon: "fa-search-plus",
                title: "Zoom buttons",
                text: "\u2212 and + zoom too. The % button fits the image to the window.",
                before: open,
                target: el('[data-ref="fit"]')
            },
            {
                icon: "fa-adjust",
                title: "Check your drawing",
                text: "Flip mirrors the image, and grayscale helps you compare light and dark values.",
                before: open,
                target: el('[data-ref="gray"]')
            },
            {
                icon: "fa-eye",
                title: "See-through window",
                text: "This slider fades the whole window, so you can see the board behind it.",
                before: open,
                target: el(".themeModRefOpacity")
            },
            {
                icon: "fa-th-large",
                title: "All your images",
                text: "Show every image here and pick one. The arrows (or \u2190 \u2192 keys) flip through them, and the trash removes the one you're on.",
                before: open,
                target: el('[data-ref="strip"]')
            },
            {
                icon: "fa-th",
                title: "Board view",
                text: "Board shows all your images at once. Drag them around, drag the corner dot to resize, scroll to zoom. Click one for more, or double-click it to open it big.",
                before: open,
                target: el(".themeModRefSeg")
            },
            {
                icon: "fa-info-circle",
                title: "Need this again?",
                text: "Press the \u24D8 button up here anytime to see this tour again. The minimize button next to it tucks the window away.",
                before: open,
                target: el(".themeModRefHelp")
            }
        ];
    }

    function addRefButton() {
        const bottomBar = document.querySelector("#bottombar > nav > div > ul:nth-child(3)");

        if (!bottomBar || bottomBar.querySelector(REF_BUTTON_SELECTOR)) {
            return;
        }

        const modItem = bottomBar.querySelector(MOD_BUTTON_SELECTOR);

        if (!modItem) {
            return;
        }

        const item = document.createElement("li");
        item.className = "nav-item";

        const button = document.createElement("a");
        button.href = "#";
        button.className = "nav-link themeModRefButton";
        button.title = "Reference images (only you can see them)";
        button.innerHTML = REF_ICON_SVG;

        button.addEventListener("click", (event) => {
            event.preventDefault();
            toggleRefWindow();
        });

        item.appendChild(button);
        modItem.closest("li").after(item);
    }


    /* =========================================================
       POPUP DECORATIONS (Interface > Popup Decorations)
       Little ears / tails / stars / flowers drawn around every
       FlockMod popup. Each popup gets one small decoration box
       (pure SVG + CSS, clicks pass straight through). They move
       and resize with the popup by themselves, hide while a popup
       is maximized (FlockMod's "dialogMaximized" class) and come
       back when it's restored.
       Colors use 4 shared roles, so there are never more than 4
       pickers: Main, Outline, Details, Sparkle. "Match my theme"
       reads them from your popups, so they follow any theme.
       ========================================================= */

    const DECO_LS = {
        style: "flockmodDecoStyle",
        placement: "flockmodDecoPlacement",
        size: "flockmodDecoSize",
        match: "flockmodDecoMatch",
        menu: "flockmodDecoMenu",
        main: "flockmodDecoMainColor",
        outline: "flockmodDecoOutlineColor",
        detail: "flockmodDecoDetailColor",
        sparkle: "flockmodDecoSparkleColor",
        frame: "flockmodDecoFrame",               /* Title bar color ON/OFF (was "Color popups to match") */
        /* v1.3 */
        colorMode: "flockmodDecoColorMode",       /* "theme" | "style" | "own" ("auto" = decide from the old match switch) */
        frameCustom: "flockmodDecoFrameCustom",   /* OFF = title bar / border pickers use the style's colors */
        frameBorder: "flockmodDecoFrameBorder",   /* Border color ON/OFF */
        frameTitle: "flockmodDecoFrameTitle",
        frameTitleText: "flockmodDecoFrameTitleText",
        frameBorderColor: "flockmodDecoFrameBorderColor"
    };

    const DECO_COLOR_MODES = ["theme", "style", "own"];
    const DECO_COLOR_MODE_TEXT = {
        theme: "Follows your popup colors, on any theme.",
        style: "The colors this style was designed with.",
        own: "Pick the decoration colors yourself."
    };

    /* Title bar / border pickers: [key, LS key, label] */
    const DECO_FRAME_PICKERS = [
        ["title", "frameTitle", "Title bar"],
        ["titleText", "frameTitleText", "Title text"],
        ["border", "frameBorderColor", "Border"]
    ];
    const DECO_FRAME_FALLBACK = { title: "#2a2c30", titleText: "#e6e7ea", border: "#3a3d43" };

    const DECO_COLOR_DEFAULTS = {
        main: "#d7b9c4",
        outline: "#b98fa0",
        detail: "#f08db0",
        sparkle: "#ffe08a"
    };

    /* ---- small SVG builders ---- */

    function decoStar(cx, cy, r, cls, sw = 1.5) {
        let d = "";

        for (let i = 0; i < 10; i++) {
            const a = -Math.PI / 2 + i * Math.PI / 5;
            const rr = i % 2 ? r * 0.45 : r;
            d += `${i ? "L" : "M"}${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`;
        }

        return `<path d="${d}Z" class="${cls} fmdO" stroke-width="${sw}" stroke-linejoin="round"/>`;
    }

    function decoFlower(cx, cy, r, rot = 0) {
        let s = `<g transform="translate(${cx} ${cy}) rotate(${rot})">`;

        for (let i = 0; i < 5; i++) {
            s += `<path d="M0 0 C${-r * 0.55} ${-r * 0.35} ${-r * 0.55} ${-r} 0 ${-r} ` +
                 `C${r * 0.12} ${-r * 0.88} ${-r * 0.02} ${-r * 0.8} 0 ${-r * 0.84} ` +
                 `C${r * 0.02} ${-r * 0.8} ${-r * 0.12} ${-r * 0.88} 0 ${-r} ` +
                 `C${r * 0.55} ${-r} ${r * 0.55} ${-r * 0.35} 0 0Z" transform="rotate(${i * 72})" ` +
                 `class="fmdD fmdO" stroke-width="1.2"/>`;
        }

        return `${s}<circle r="${(r * 0.22).toFixed(1)}" class="fmdS"/></g>`;
    }

    function decoPetal(x, y, s, rot) {
        return `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" ` +
               `d="M0 0 C-5 -3 -5 -10 0 -12 C1 -10 -0.5 -9.5 0 -10 C0.5 -9.5 -1 -10 0 -12 C5 -10 5 -3 0 0Z" ` +
               `class="fmdD fmdO" stroke-width="${(1 / s).toFixed(2)}"/>`;
    }

    /* A tail drawn as a thick line: outline stroke under a main stroke */
    function decoStrokeTail(d, outlineW, mainW) {
        return `<path d="${d}" class="fmdOs" stroke-width="${outlineW}" stroke-linecap="round"/>` +
               `<path d="${d}" class="fmdMs" stroke-width="${mainW}" stroke-linecap="round"/>`;
    }

    /* Tails are drawn pointing right (attached at x = 0). For
       "bottom" they're turned to point down (attached at y = 0). */
    function tailPiece(tail, placement) {
        if (placement === "side") {
            return { w: tail.w, h: tail.h, svg: tail.svg, edge: "right", at: tail.side, inset: tail.inset };
        }

        return {
            w: tail.h,
            h: tail.w,
            svg: `<g transform="translate(${tail.h} 0) rotate(90)">${tail.svg}</g>`,
            edge: "bottom",
            at: tail.bottom,
            inset: tail.inset
        };
    }

    const DECO_TAILS = {
        cat: { w: 40, h: 96, side: "38%", bottom: "68%", inset: 1,
            svg: decoStrokeTail("M0 88 C31 88 37 58 22 40 C9 24 14 4 33 4", 10, 6) },
        dog: { w: 38, h: 48, side: "55%", bottom: "70%", inset: 1,
            svg: decoStrokeTail("M0 40 C20 40 30 30 30 8", 12, 8) },
        fox: { w: 56, h: 76, side: "30%", bottom: "62%", inset: 1,
            svg: '<path d="M0 72 C42 68 56 32 40 2 C36 28 24 44 0 46Z" class="fmdM fmdO" stroke-width="2" stroke-linejoin="round"/>' +
                 '<path d="M40 2 C44 12 44 20 41 27 C36 25 34 16 40 2Z" class="fmdS"/>' },
        /* v1.5: fluffy cloud-puff tail (outline layer, then the fluff) */
        bunny: { w: 36, h: 36, side: "60%", bottom: "48%", inset: 0,
            svg: '<g class="fmdOf fmdO" stroke-width="3.2"><circle cx="29.0" cy="21.4" r="5.8"/><circle cx="24.2" cy="27.7" r="5.8"/><circle cx="16.6" cy="29.4" r="5.8"/><circle cx="9.6" cy="25.8" r="5.8"/><circle cx="6.5" cy="18.6" r="5.8"/><circle cx="8.8" cy="11.0" r="5.8"/><circle cx="15.4" cy="6.8" r="5.8"/><circle cx="23.3" cy="7.8" r="5.8"/><circle cx="28.6" cy="13.5" r="5.8"/><circle cx="18" cy="18" r="11"/></g>' +
                 '<g class="fmdS"><circle cx="29.0" cy="21.4" r="5.8"/><circle cx="24.2" cy="27.7" r="5.8"/><circle cx="16.6" cy="29.4" r="5.8"/><circle cx="9.6" cy="25.8" r="5.8"/><circle cx="6.5" cy="18.6" r="5.8"/><circle cx="8.8" cy="11.0" r="5.8"/><circle cx="15.4" cy="6.8" r="5.8"/><circle cx="23.3" cy="7.8" r="5.8"/><circle cx="28.6" cy="13.5" r="5.8"/><circle cx="18" cy="18" r="11"/></g>' },
        bear: { w: 24, h: 24, side: "58%", bottom: "48%", inset: 0,
            svg: '<circle cx="12" cy="12" r="10" class="fmdM fmdO" stroke-width="2"/>' }
    };

    /* Ear shapes sit on the top edge (their bottom at y = h) */
    /* v1.5 "Tidy": softer, rounded cat ears */
    const EAR_CAT = { w: 40, h: 32, inset: 2,
        svg: '<path d="M3 32 C5 21 11 10 16.5 5 Q20 1.5 23.5 5 C29 10 35 21 37 32Z" class="fmdM fmdO" stroke-width="2" stroke-linejoin="round"/>' +
             '<path d="M11 31.5 C12.5 24 15.5 17 18.6 13.2 Q20 11.8 21.4 13.2 C24.5 17 27.5 24 29 31.5Z" class="fmdD"/>' };
    const EAR_FOX = { w: 40, h: 38, inset: 2,
        svg: '<path d="M2 38 L17 5 Q20 0 23 5 L38 38Z" class="fmdM fmdO" stroke-width="2" stroke-linejoin="round"/>' +
             '<path d="M11 37 L19 17 Q20 15 21 17 L29 37Z" class="fmdD"/>' };
    const EAR_BEAR = { w: 34, h: 18, inset: 1,
        svg: '<path d="M1 18 A16 16 0 0 1 33 18Z" class="fmdM fmdO" stroke-width="2"/>' +
             '<path d="M9 18 A8 8 0 0 1 25 18Z" class="fmdD"/>' };
    /* v1.5: fuller bunny ears that sit on the title bar */
    const EAR_BUNNY = { w: 30, h: 58, inset: 4,
        svg: '<g transform="rotate(-10 15 58)"><path d="M7 58 C2 44 0.5 26 3 14 C5 5 10 1 15 1 C20 1 25 5 27 14 C29.5 26 28 44 23 58Z" class="fmdM fmdO" stroke-width="2" stroke-linejoin="round"/>' +
             '<path d="M10.5 56 C7.5 44 7 30 9 19 C10.5 12 13 8.5 15 8.5 C17 8.5 19.5 12 21 19 C23 30 22.5 44 19.5 56Z" class="fmdD"/></g>' };
    const EAR_DOG = { w: 30, h: 66,
        svg: '<path d="M26 2 C12 -2 2 10 2 28 C2 50 8 64 16 64 C23 64 26 52 27 40 C28 26 32 6 26 2Z" class="fmdM fmdO" stroke-width="2"/>' };

    function earPair(ear, at) {
        return [
            { ...ear, edge: "top", from: "left", at },
            { ...ear, edge: "top", from: "right", at, mirror: true }
        ];
    }

    /* ---- v1.6: Ethereal luna moth (Moth style), inspired by Discord's glowing
       butterfly decorations. Left half drawn, right half mirrored. b = bubble colors ---- */
    const LUNA_UP = "M30 20 C22 5 8 -1 3 5 C-1 11 5 22 14 25 C20 27 26 25 30 22Z";
    const LUNA_LO = "M30 24 C24 27 16 30 14 36 C13 42 16 50 12 60 C20 53 22 45 26 38 C29 33 30 29 31 27Z";
    function lunaMothSVG(b) {
        const M = b ? "fmbA" : "fmdM", D = b ? "fmbC" : "fmdD", S = b ? "fmbD" : "fmdS", Ss = b ? "fmbDs" : "fmdSs";
        const half = `<path d="${LUNA_LO}" class="${D}" opacity=".3"/><path d="${LUNA_UP}" class="${M}" opacity=".3"/>` +
            `<path d="${LUNA_LO}" class="${Ss}" fill="none" stroke-width="1.2" stroke-linejoin="round"/>` +
            `<path d="${LUNA_UP}" class="${Ss}" fill="none" stroke-width="1.2" stroke-linejoin="round"/>` +
            `<path d="${LUNA_UP}" class="${Ss}" fill="none" stroke-width="1.8" stroke-dasharray="0 3.4" stroke-linecap="round" transform="translate(1.2 1.2) scale(.93)"/>` +
            `<path d="M30 21 C22 14 14 10 7 7 M30 21 C22 18 14 18 7 18 M30 25 C24 30 19 34 16 44" class="${Ss}" fill="none" stroke-width=".7" opacity=".55"/>` +
            `<circle cx="13" cy="12" r="3.6" class="${Ss}" fill="none" stroke-width="1"/><circle cx="13" cy="12" r="1.5" class="${S}"/><circle cx="18" cy="38" r="1.6" class="${S}"/>`;
        return `<g class="fmdLunaFlap"><g>${half}</g><g transform="translate(64 0) scale(-1 1)">${half}</g></g>` +
            `<path d="M31 14 C29 9 27 6 24 3 M33 14 C35 9 37 6 40 3" class="${Ss}" stroke-width="1" fill="none"/>` +
            `<path d="M24 3 C27 4 29 7 30 10 C28 9 25 7 24 3Z M40 3 C37 4 35 7 34 10 C36 9 39 7 40 3Z" class="${S}" opacity=".85"/>` +
            `<ellipse cx="32" cy="27" rx="2.2" ry="11" class="${S}"/><circle cx="32" cy="15.5" r="2.5" class="${S}"/>`;
    }
    /* tiny glowing outline moth */
    function lunaGhost(x, y, r, s) {
        return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s}) translate(-32 -28)">` +
            `<g class="fmdSs" fill="none" stroke-width="${(0.77 / s).toFixed(2)}"><path d="${LUNA_UP}"/><path d="${LUNA_LO}"/>` +
            `<g transform="translate(64 0) scale(-1 1)"><path d="${LUNA_UP}"/><path d="${LUNA_LO}"/></g></g>` +
            '<ellipse cx="32" cy="27" rx="2" ry="10" class="fmdS"/></g>';
    }
    const lunaDot = (x, y, r, o) => `<circle cx="${x}" cy="${y}" r="${r}" class="fmdS" opacity="${o}"/>`;

    /* Each style: menu label, color labels (null = not used, hidden),
       placement choices, and a pieces(placement) builder. */
    const DECO_STYLES = {
        none: { label: "None", placements: [], colors: {}, pieces: () => [] },

        cat: {
            label: "Cat",
            palette: { main: "#e8d5c4", outline: "#8a6a58", detail: "#f4a7b9", sparkle: "#fff3e0" },
            frame: { bg: "#2a2320", content: "#2a2320", title: "#4a3a32", titleText: "#f6e6da", text: "#eadbd0", border: "#6e5646" },
            placements: ["side", "bottom", "none"],
            colors: { main: "Fur", outline: "Outline", detail: "Inner ears", sparkle: null },
            pieces: (p) => [...earPair(EAR_CAT, 22), ...(p === "none" ? [] : [tailPiece(DECO_TAILS.cat, p)])]
        },
        dog: {
            label: "Dog",
            palette: { main: "#c89b6d", outline: "#5e4331", detail: "#e9c9a4", sparkle: "#fff4e6" },
            frame: { bg: "#26211d", content: "#26211d", title: "#4a3b2e", titleText: "#f3e4d2", text: "#e6d8c8", border: "#6b5441" },
            placements: ["bottom", "side", "none"],
            colors: { main: "Fur", outline: "Outline", detail: null, sparkle: null },
            /* Floppy ears hang OUTSIDE the corners, so titles stay readable */
            pieces: (p) => [
                { ...EAR_DOG, corner: "tl", dx: -22, dy: -8 },
                { ...EAR_DOG, corner: "tr", dx: -22, dy: -8, mirror: true },
                ...(p === "none" ? [] : [tailPiece(DECO_TAILS.dog, p)])
            ]
        },
        bunny: {
            label: "Bunny",
            palette: { main: "#f5eef0", outline: "#b78b98", detail: "#f6b8c8", sparkle: "#ffffff" },
            frame: { bg: "#2a2226", content: "#2a2226", title: "#5a4450", titleText: "#fde8ef", text: "#eedde3", border: "#7a5c68" },
            placements: ["side", "bottom", "none"],
            colors: { main: "Fur", outline: "Outline", detail: "Inner ears", sparkle: "Pom-pom tail" },
            pieces: (p) => [...earPair(EAR_BUNNY, 26), ...(p === "none" ? [] : [tailPiece(DECO_TAILS.bunny, p)])]
        },
        bear: {
            label: "Bear",
            palette: { main: "#9a6b4b", outline: "#4a3020", detail: "#d9b08c", sparkle: "#f3dcc4" },
            frame: { bg: "#241d19", content: "#241d19", title: "#4b3627", titleText: "#f0dcc8", text: "#e3d2c2", border: "#6a4d38" },
            placements: ["bottom", "side", "none"],
            colors: { main: "Fur", outline: "Outline", detail: "Inner ears", sparkle: null },
            pieces: (p) => [...earPair(EAR_BEAR, 20), ...(p === "none" ? [] : [tailPiece(DECO_TAILS.bear, p)])]
        },
        fox: {
            label: "Fox",
            palette: { main: "#e07a3c", outline: "#5a2e14", detail: "#ffe1cc", sparkle: "#ffffff" },
            frame: { bg: "#261c17", content: "#261c17", title: "#5a2e18", titleText: "#ffe2cc", text: "#eed9ca", border: "#7a4326" },
            placements: ["side", "bottom", "none"],
            colors: { main: "Fur", outline: "Outline", detail: "Inner ears", sparkle: "Tail tip" },
            pieces: (p) => [...earPair(EAR_FOX, 20), ...(p === "none" ? [] : [tailPiece(DECO_TAILS.fox, p)])]
        },
        stars: {
            label: "Stars",
            palette: { main: "#232a4d", outline: "#c9a95a", detail: "#ffe08a", sparkle: "#fff3b8" },
            frame: { bg: "#161a2e", content: "#161a2e", title: "#232a4d", titleText: "#ffe9a8", text: "#dfe3f3", border: "#3a4273" },
            placements: ["left", "right"],
            colors: { main: null, outline: "Outline", detail: "Small stars", sparkle: "Big stars" },
            pieces: (p) => decoCornerPieces(p,
                { w: 72, h: 66, dx: -26, dy: -26,
                  svg: decoStar(24, 24, 19, "fmdS", 2) + decoStar(54, 11, 7, "fmdD") + decoStar(9, 52, 6, "fmdD") },
                { w: 62, h: 62, dx: -24, dy: -24,
                  svg: decoStar(40, 40, 15, "fmdS", 2) + decoStar(14, 50, 6, "fmdD") + decoStar(52, 12, 6, "fmdD") },
                { w: 16, h: 64, svg: decoStar(8, 8, 4, "fmdS", 1) + decoStar(7, 46, 3.5, "fmdD", 1) })
        },
        sakura: {
            label: "Sakura",
            palette: { main: "#ffffff", outline: "#d97a9b", detail: "#ffc2d6", sparkle: "#ffe08a" },
            frame: { bg: "#2a1f25", content: "#2a1f25", title: "#5c3446", titleText: "#ffe3ee", text: "#f1dde5", border: "#8a4f68" },
            placements: ["left", "right"],
            colors: { main: null, outline: "Outline", detail: "Petals", sparkle: "Flower centers" },
            pieces: (p) => decoCornerPieces(p,
                { w: 78, h: 72, dx: -28, dy: -28,
                  svg: decoFlower(26, 26, 20, 10) + decoFlower(58, 12, 9, 40) + decoPetal(10, 64, 0.9, -30) },
                { w: 62, h: 64, dx: -22, dy: -24,
                  svg: decoFlower(38, 38, 14, -15) + decoPetal(10, 56, 0.9, 60) + decoPetal(52, 10, 0.8, 20) },
                { w: 18, h: 72, svg: decoPetal(9, 14, 0.8, 40) + decoPetal(8, 58, 1, -20) })
        },
        witch: {
            label: "Witch hat",
            palette: { main: "#3a2a55", outline: "#1a1026", detail: "#9b6ad6", sparkle: "#ffd86b" },
            frame: { bg: "#1c1726", content: "#1c1726", title: "#2e2340", titleText: "#e8dcff", text: "#ddd4ee", border: "#4a3a66" },
            placements: ["left", "right"],
            colors: { main: "Hat", outline: "Outline", detail: "Band", sparkle: "Stars" },
            pieces: (p) => {
                const hat = {
                    w: 76, h: 56, edge: "top", from: p === "right" ? "right" : "left", at: 10, inset: 5,
                    mirror: p === "right",
                    svg: '<g transform="rotate(-14 40 52)">' +
                         '<path d="M40 4 C52 10 58 24 64 46 L22 46 C28 30 30 14 40 4Z" class="fmdM fmdO" stroke-width="2" stroke-linejoin="round"/>' +
                         '<path d="M40 4 C34 0 26 2 22 8" fill="none" class="fmdOs" stroke-width="4" stroke-linecap="round"/>' +
                         '<rect x="25" y="38" width="36" height="7" rx="2" class="fmdD"/>' +
                         '<ellipse cx="43" cy="47" rx="32" ry="6" class="fmdM fmdO" stroke-width="2"/></g>'
                };
                const sparkles = {
                    w: 40, h: 40, corner: p === "right" ? "bl" : "br", dx: -18, dy: -18,
                    mirror: p === "right",
                    svg: decoStar(24, 24, 7, "fmdS", 1.2) + decoStar(10, 8, 4, "fmdS", 1)
                };
                return [hat, sparkles];
            }
        }
    };


    /* ---------------------------------------------------------
       THEME PACK DECORATIONS (v1.3)
       Darker / neutral styles. Same 4 color roles as the others;
       each also has its own "palette" that the "Use this style's
       colors" button copies into the pickers.
       Extra piece kinds used here (see decoPieceHTML):
         fill: "frame" | "title" | "titleline" | "topline" | "under"
               overlays that follow the popup (no size scaling)
         edge "top" + from "center"
         flip: "x" | "y" | "xy"
       --------------------------------------------------------- */

    function decoLeaf(x, y, len, rot, cls) {
        const a = (len * 0.25).toFixed(1), b = (len * 0.75).toFixed(1), c = (len * 0.32).toFixed(1);
        return `<g transform="translate(${x} ${y}) rotate(${rot})">` +
               `<path d="M0 0 C${a} -${c} ${b} -${c} ${len} 0 C${b} ${c} ${a} ${c} 0 0Z" class="${cls} fmdO" stroke-width="1"/>` +
               `<path d="M1.5 0 L${(len - 2).toFixed(1)} 0" class="fmdOs" stroke-width=".8"/></g>`;
    }

    function decoButterfly() {
        const wing = '<path d="M20 15 C14 3 3 1 2 8 C1 15 11 17 20 16Z" class="fmdM fmdO" stroke-width=".8"/>' +
                     '<path d="M20 17 C13 18 6 23 8 28 C11 32 18 25 20 17Z" class="fmdD fmdO" stroke-width=".8"/>' +
                     '<circle cx="8" cy="8" r="2.2" class="fmdS"/><circle cx="12" cy="25" r="1.3" class="fmdS"/>';
        return `<g class="fmdWing">${wing}</g>` +
               `<g transform="translate(40 0) scale(-1 1)"><g class="fmdWing">${wing}</g></g>` +
               '<rect x="18.9" y="9" width="2.2" height="15" rx="1.1" class="fmdOf"/>' +
               '<path d="M19.6 10 C18 5 16 4 14 3 M20.4 10 C22 5 24 4 26 3" class="fmdOs" stroke-width="1" stroke-linecap="round"/>';
    }

    const DECO_HORN = { w: 24, h: 30, inset: 2,
        svg: '<path d="M3 30 C2 17 9 6 22 1 C15 9 12 18 15 30Z" class="fmdM fmdO" stroke-width="1.5" stroke-linejoin="round"/>' +
             '<path d="M22 1 C18 5 16 8 14.5 12 C16.5 10 18.5 9 19.5 9 C20.5 6 21.5 3.5 22 1Z" class="fmdS"/>' +
             '<path d="M5.5 24 L11 23 M6 18 L12 17 M8 12 L13.5 12" class="fmdOs" stroke-width="1" opacity=".6"/>' };

    /* Thick at the popup, thin at the spade tip. The base tucks
       under the border so it grows out of the popup. */
    const DECO_DRAGON_TAIL = { w: 66, h: 46, side: "58%", bottom: "76%", inset: 5,
        svg: '<path d="M14 9 L19 1 L22 12Z M28 15 L34 8 L35 19Z" class="fmdD fmdO" stroke-width="1" stroke-linejoin="round"/>' +
             '<path d="M0 6 C18 6 30 16 44 29 L46 34 C30 26 16 22 0 22Z" class="fmdM fmdO" stroke-width="1.6" stroke-linejoin="round"/>' +
             '<path d="M42 29 L58 20 L55 33 L65 43 L44 38Z" class="fmdD fmdO" stroke-width="1.5" stroke-linejoin="round"/>' };

    /* Sits 3px outside the corner, running along both borders */
    const decoGothCorner =
        '<path d="M3 34 L3 3 L34 3" class="fmdOs" stroke-width="1.6" stroke-linecap="square"/>' +
        '<path d="M3 3 L-3 -3" class="fmdOs" stroke-width="1.2" stroke-linecap="round"/>' +
        '<path d="M34 0 L37 3 L34 6 L31 3Z M0 34 L3 31 L6 34 L3 37Z" class="fmdOf"/>' +
        '<path d="M3 -1 L7 3 L3 7 L-1 3Z" class="fmdD fmdO" stroke-width=".8"/>';

    const decoBat =
        '<path d="M30 10 C24 2 12 2 2 8 C8 9 10 12 10 16 C14 13 18 14 20 18 C22 14 26 13 30 16 C34 13 38 14 40 18 C42 14 46 13 50 16 C50 12 52 9 58 8 C48 2 36 2 30 10Z" class="fmdM fmdBatWings"/>' +
        '<path d="M26.5 9 L27 4 L29 8 L31 8 L33 4 L33.5 9 Q30 15 26.5 9Z" class="fmdM"/>' +
        '<circle cx="28.6" cy="9.3" r=".9" class="fmdS"/><circle cx="31.4" cy="9.3" r=".9" class="fmdS"/>' +
        '<path d="M28.6 13 L28 18 M31.4 13 L32 18" class="fmdMs" stroke-width="1.3" stroke-linecap="round"/>';

    function decoWeb() {
        /* corner point at (34, 34); strands reach up and to the left */
        const P = (t, x, y) => `${(34 - t * x).toFixed(1)} ${(34 - t * y).toFixed(1)}`;
        const dirs = [[34, 6], [30, 22], [20, 30], [6, 34]];
        let d = dirs.map(([x, y]) => `M34 34 L${P(1, x, y)}`).join(" ");
        [0.3, 0.6, 0.9].forEach((t) => {
            d += " M" + P(t, ...dirs[0]);
            for (let i = 1; i < dirs.length; i++) {
                const m = (t * 0.8);
                const cx = 34 - m * (dirs[i - 1][0] + dirs[i][0]) / 2;
                const cy = 34 - m * (dirs[i - 1][1] + dirs[i][1]) / 2;
                d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${P(t, ...dirs[i])}`;
            }
        });
        return `<path d="${d}" class="fmdOs" stroke-width=".8" opacity=".85"/>`;
    }

    const decoSpider =
        '<line x1="10" y1="0" x2="10" y2="30" class="fmdOs" stroke-width=".8"/>' +
        '<g class="fmdOs" stroke-width="1.1" stroke-linecap="round"><path d="M7 33 L2 29 M7 35 L1 35 M7 37 L2 41 M8 38 L5 43 M13 33 L18 29 M13 35 L19 35 M13 37 L18 41 M12 38 L15 43"/></g>' +
        '<ellipse cx="10" cy="35" rx="4" ry="4.6" class="fmdM fmdO" stroke-width=".9"/>' +
        '<circle cx="8.6" cy="34" r=".9" class="fmdD"/><circle cx="11.4" cy="34" r=".9" class="fmdD"/>';

    /* v1.6: a real layered rose (36x34). b = bubble colors */
    const roseHeadSVG = (b) => {
        const M = b ? "fmbA fmbCs" : "fmdM fmdO", D = b ? "fmbB" : "fmdD", In = b ? "fmbC" : "fmdOf", Os = b ? "fmbCs" : "fmdOs";
        return `<path d="M4 27 C1 22 6 19 11 23Z" class="${D}"/><path d="M32 27 C35 22 30 19 25 23Z" class="${D}"/>` +
            `<g class="fmdBloom"><path d="M6 16 C4 8 12 3 18 5 C24 3 32 8 30 16 C30 24 24 29 18 29 C12 29 6 24 6 16Z" class="${M}" stroke-width="1.5"/>` +
            `<path d="M10 14 C12 8 23 8 26 13" class="${Os}" fill="none" stroke-width="1.3" stroke-linecap="round"/>` +
            `<path d="M9 19 C12 25 24 25 27 19" class="${Os}" fill="none" stroke-width="1.3" stroke-linecap="round"/>` +
            `<path d="M14 16 C14 11 22 11 22 16 C22 20 14 20 14 16Z" class="${In}" opacity=".55"/>` +
            `<path d="M16.5 15.5 C17 13.5 19.5 13.5 20 15.5" class="${Os}" fill="none" stroke-width="1.1" stroke-linecap="round"/></g>`;
    };
    const decoRose = roseHeadSVG(false);

    const decoStem =
        '<path d="M8 0 C6 30 10 60 7 90 C6 105 8 118 8 130" class="fmdDs" stroke-width="2.4" stroke-linecap="round"/>' +
        '<g class="fmdS"><path d="M7 22 L1 19 L6 26Z"/><path d="M9 48 L15 44 L10 52Z"/><path d="M7 74 L1 71 L6 78Z"/><path d="M8 102 L14 99 L9 106Z"/></g>' +
        '<path d="M8 60 C14 54 16 60 14 64 C12 66 9 64 8 60Z" class="fmdD"/>';

    const decoJelly =
        '<g class="fmdBob"><path d="M4 18 Q4 3 18 3 Q32 3 32 18 Q28 16 25 18 Q22 16 18 18 Q14 16 11 18 Q8 16 4 18Z" class="fmdM fmdJellyBell"/>' +
        '<g class="fmdOs" stroke-width="1.3" stroke-linecap="round" opacity=".85"><path d="M9 18 Q7 26 10 32 Q12 38 9 45"/><path d="M15 19 Q17 27 14 34 Q12 40 15 48"/><path d="M21 19 Q19 27 22 34 Q24 40 21 47"/><path d="M27 18 Q29 25 26 31 Q24 37 27 43"/></g></g>';

    /* Kelp growing up the side from the bottom corner */
    const decoKelp =
        '<g class="fmdSway"><path d="M6 96 C2 80 11 66 6 50 C2 36 10 24 7 8" class="fmdOs" stroke-width="2.2" stroke-linecap="round"/>' +
        '<path d="M16 96 C19 84 12 74 16 62 C19 52 14 44 16 36" class="fmdOs" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>' +
        '<path d="M6 70 C0 66 -2 60 1 56 C4 60 6 64 6 70Z M7 40 C13 36 15 30 12 26 C9 30 7 34 7 40Z M16 80 C22 76 23 70 20 67 C17 70 16 74 16 80Z" class="fmdOf" opacity=".85"/></g>';

    const decoAirBubbles =
        '<g class="fmdRise fmdSs" stroke-width="1.2"><circle cx="8" cy="34" r="4"/><circle cx="4" cy="20" r="2.5"/><circle cx="10" cy="8" r="3"/></g>';

    const decoBerry =
        '<path d="M13 8 C22 6 26 12 24 18 C22 25 16 29 13 29 C10 29 4 25 2 18 C0 12 4 6 13 8Z" class="fmdM fmdO" stroke-width="1.2"/>' +
        '<g class="fmdS"><ellipse cx="8" cy="14" rx=".8" ry="1.3"/><ellipse cx="14" cy="13" rx=".8" ry="1.3"/><ellipse cx="19" cy="15" rx=".8" ry="1.3"/><ellipse cx="10" cy="20" rx=".8" ry="1.3"/><ellipse cx="16" cy="21" rx=".8" ry="1.3"/><ellipse cx="13" cy="26" rx=".8" ry="1.3"/></g>' +
        '<path d="M13 9 L8 5 L10 10 L4 9 L9 12 L13 10 L17 12 L22 9 L16 10 L18 5Z" class="fmdD"/>';

    const decoCap =
        '<g class="fmdBounce"><path d="M22 8 L15 2 L17 9 L6 7 L13 12 L3 16 L16 14 L22 21 L28 14 L41 16 L31 12 L38 7 L27 9 L29 2Z" class="fmdD fmdO" stroke-width="1" stroke-linejoin="round"/>' +
        '<rect x="20.8" y="0" width="2.6" height="9" rx="1.3" class="fmdOf"/></g>';

    const decoInkLeaf = (x, y, rot, len = 1) =>
        `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${len})" d="M0 0 C5 -2.8 14 -2.6 22 0 C14 2.2 5 2 0 0Z" class="fmdM"/>`;

    /* Drawn for the LEFT side of a popup: the stalk stands on the
       bottom corner and leans on the border, leaves point outward */
    const decoBamboo =
        '<path d="M24 118 L24 88 M24 84 L23 54 M23 50 L21 22" class="fmdMs" stroke-width="3.8" stroke-linecap="round"/>' +
        '<path d="M21.5 86 L26.5 86 M20.5 52 L25.5 52" class="fmdMs" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>' +
        decoInkLeaf(22, 52, -160) + decoInkLeaf(22, 51, -128, 0.9) + decoInkLeaf(23, 86, 172, 0.85) +
        decoInkLeaf(21, 22, -104, 0.8) + decoInkLeaf(21, 23, -148, 0.7);

    Object.assign(DECO_STYLES, {
        glitch: {
            label: "Glitch",
            frame: { bg: "#0c0c12", content: "#0c0c12", title: "#11111a", titleText: "#d8d8e6", text: "#d8d8e6", border: "#2a2a3a" },
            placements: [],
            palette: { main: "#11111a", outline: "#2a2a3a", detail: "#00e5ff", sparkle: "#ff2bd6" },
            colors: { main: null, outline: null, detail: "Cyan side", sparkle: "Pink side" },
            pieces: () => [
                { fill: "frame", html: '<i class="fmdGlitchFrame"></i><i class="fmdSlice fmdSliceA"></i><i class="fmdSlice fmdSliceB"></i>' },
                { fill: "title", html: '<i class="fmdScan"></i>' },
                { w: 22, h: 22, corner: "tr", dx: -10, dy: -10,
                  svg: '<rect x="8" y="0" width="6" height="6" class="fmdS"/><rect x="14" y="6" width="6" height="6" class="fmdD"/><rect x="2" y="10" width="4" height="4" fill="#fff" opacity=".55"/>' },
                { w: 16, h: 16, corner: "bl", dx: -8, dy: -8,
                  svg: '<rect x="0" y="6" width="5" height="5" class="fmdD"/><rect x="6" y="11" width="4" height="4" class="fmdS"/>' }
            ]
        },
        moth: {
            /* v1.6: redrawn as an ethereal luna moth with a swarm of tiny glowing moths */
            label: "Luna moth",
            frame: { bg: "#131a17", content: "#131a17", title: "#1c2722", titleText: "#e3f5ea", text: "#d3e8dc", border: "#335447" },
            placements: ["right", "left"],
            palette: { main: "#c9f5df", outline: "#5fd6a0", detail: "#a6e9c8", sparkle: "#f4fff0" },
            colors: { main: "Upper wings", outline: "Glow", detail: "Lower wings", sparkle: "Light & sparkles" },
            pieces: (p) => {
                const right = p !== "left";
                const f = right ? "" : "x";
                return [
                    /* the swarm around the corner and down the side (corner point = 40,58) */
                    { w: 110, h: 150, corner: right ? "tr" : "tl", dx: -70, dy: -58, flip: f, cls: "fmdLunaSwarm",
                      svg: lunaGhost(14, 20, -20, 0.24) + lunaGhost(96, 14, 25, 0.2) + lunaGhost(98, 78, 70, 0.26) + lunaGhost(84, 128, 110, 0.2) +
                           lunaDot(30, 8, 1.2, 0.9) + lunaDot(62, 4, 0.9, 0.7) + lunaDot(104, 44, 1.1, 0.8) + lunaDot(88, 100, 1, 0.7) +
                           lunaDot(70, 140, 1.3, 0.8) + lunaDot(6, 40, 0.9, 0.6) + lunaDot(100, 112, 0.8, 0.6) },
                    /* the big luna moth, just outside the corner */
                    { w: 60, h: 62, corner: right ? "tr" : "tl", dx: -44, dy: -50, flip: f, cls: "fmdLunaGlow",
                      svg: `<g transform="rotate(24 30 30) scale(.86)">${lunaMothSVG(false)}</g>` },
                    /* two little ones on the opposite bottom corner */
                    { w: 60, h: 60, corner: right ? "bl" : "br", dx: -30, dy: -30, flip: f, cls: "fmdLunaSwarm fmdLunaSwarm2",
                      svg: lunaGhost(22, 30, -30, 0.32) + lunaGhost(46, 46, 20, 0.22) + lunaDot(8, 52, 1, 0.8) + lunaDot(52, 20, 1, 0.7) }
                ];
            }
        },
        leaves: {
            label: "Leaves",
            frame: { bg: "#1b231e", content: "#1b231e", title: "#223029", titleText: "#dbe8de", text: "#dbe8de", border: "#33463a" },
            placements: ["left", "right"],
            palette: { main: "#4f8a5e", outline: "#2e5a3a", detail: "#7fb58c", sparkle: "#a8d5a0" },
            colors: { main: "Leaves", outline: "Vine & veins", detail: "Light leaves", sparkle: null },
            pieces: (p) => {
                const right = p === "right";
                /* v1.6: ivy that runs along the top and down the side (tiles to
                   any popup size), a fuller corner cluster, a sprig opposite */
                return [
                    { fill: right ? "ivyTopR" : "ivyTopL", html: '<i class="fmdIvy"></i>' },
                    { fill: right ? "ivySideR" : "ivySideL", html: '<i class="fmdIvy"></i>' },
                    { w: 52, h: 50, corner: right ? "tr" : "tl", dx: -26, dy: -26, flip: right ? "x" : "",
                      svg: decoLeaf(26, 26, 26, -150, "fmdM") + decoLeaf(27, 25, 22, -100, "fmdD") + decoLeaf(25, 27, 21, 165, "fmdD") +
                           decoLeaf(28, 24, 17, -55, "fmdM") + decoLeaf(26, 26, 15, 125, "fmdM") },
                    { w: 34, h: 32, corner: right ? "bl" : "br", dx: -16, dy: -16, flip: right ? "x" : "",
                      svg: decoLeaf(16, 16, 18, 20, "fmdM") + decoLeaf(16, 16, 16, 70, "fmdD") + decoLeaf(16, 16, 13, -25, "fmdD") }
                ];
            }
        },
        strawberry: {
            label: "Strawberry",
            frame: { bg: "#2a1d20", content: "#2a1d20", title: "#c73a4c", titleText: "#ffffff", text: "#f3e3e5", border: "#5a2e36" },
            placements: [],
            palette: { main: "#d8465a", outline: "#2f6e30", detail: "#4f9e4a", sparkle: "#ffe39a" },
            colors: { main: "Berry", outline: "Outline", detail: "Leaves", sparkle: "Seeds" },
            pieces: () => [
                { fill: "title", html: '<i class="fmdSeeds"></i>' },
                { w: 44, h: 22, edge: "top", from: "center", inset: 7, svg: decoCap },
                { w: 38, h: 40, edge: "bottom", at: "80%", inset: 1, cls: "fmdDangle",
                  svg: '<path d="M19 0 C19 6 13 9 11 15 M19 0 C20 7 25 11 27 17" class="fmdOs" stroke-width="1.6" stroke-linecap="round"/>' +
                       `<g transform="translate(2 12) scale(.66)">${decoBerry}</g><g transform="translate(18 15) scale(.6)">${decoBerry}</g>` }
            ]
        },
        dragon: {
            label: "Dragon",
            frame: { bg: "#161515", content: "#161515", title: "#3a1410", titleText: "#f3c9a8", text: "#e7dcd6", border: "#5c2419" },
            placements: ["side", "bottom", "none"],
            palette: { main: "#7a2b1c", outline: "#2a0e09", detail: "#d9532c", sparkle: "#e2a57c" },
            colors: { main: "Scales", outline: "Outline", detail: "Tail tip", sparkle: "Horn tips" },
            pieces: (p) => [
                { fill: "title", html: '<i class="fmdScales"></i>' },
                { ...DECO_HORN, edge: "top", from: "left", at: 14 },
                { ...DECO_HORN, edge: "top", from: "right", at: 14, mirror: true },
                ...(p === "none" ? [] : [{ ...tailPiece(DECO_DRAGON_TAIL, p), cls: "fmdTailSwish" }])
            ]
        },
        gothic: {
            label: "Gothic lace",
            frame: { bg: "#141114", content: "#141114", title: "#1f171c", titleText: "#e6d9df", text: "#d8cdd2", border: "#4a3a42" },
            placements: [],
            palette: { main: "#9a8290", outline: "#b9a7b1", detail: "#9b1b35", sparkle: "#e05a78" },
            colors: { main: "Bat", outline: "Filigree & lace", detail: "Gems", sparkle: "Bat eyes" },
            pieces: () => [
                { w: 38, h: 38, corner: "tl", dx: -6, dy: -6, svg: decoGothCorner },
                { w: 38, h: 38, corner: "tr", dx: -6, dy: -6, flip: "x", svg: decoGothCorner },
                { w: 38, h: 38, corner: "bl", dx: -6, dy: -6, flip: "y", svg: decoGothCorner },
                { w: 38, h: 38, corner: "br", dx: -6, dy: -6, flip: "xy", svg: decoGothCorner },
                { w: 60, h: 20, edge: "top", from: "center", inset: 2, svg: decoBat },
                { fill: "under", html: '<i class="fmdLace"></i>' }
            ]
        },
        nightsky: {
            label: "Night sky",
            frame: { bg: "#111a31", content: "#111a31", title: "#18244a", titleText: "#f1ddb0", text: "#d9def0", border: "#2d3b6b" },
            placements: ["right", "left"],
            palette: { main: "#e8c97a", outline: "#c9a95a", detail: "#e8c97a", sparkle: "#fff6d8" },
            colors: { main: "Moon", outline: "Lines", detail: "Big stars", sparkle: "Small stars" },
            pieces: (p) => {
                const right = p !== "left";
                return [
                    /* crescent resting on the corner, dipping just past the edge */
                    { w: 34, h: 32, corner: right ? "tr" : "tl", dx: -17, dy: -24, flip: right ? "" : "x",
                      svg: '<path d="M19 3 A13 13 0 1 0 30 22 A10.5 10.5 0 1 1 19 3Z" class="fmdM"/><circle cx="11" cy="18" r="1.6" class="fmdOf" opacity=".5"/><circle cx="9" cy="11" r="1" class="fmdOf" opacity=".45"/>' },
                    /* a little star mobile hanging from the bottom edge */
                    { w: 60, h: 42, edge: "bottom", at: right ? "26%" : "74%", inset: 0, cls: "fmdDangle",
                      svg: '<path d="M10 0 L10 17 M30 0 L30 28 M50 0 L50 10" class="fmdOs" stroke-width=".9" opacity=".85"/>' +
                           `<g class="fmdTwinkle">${decoStar(30, 34, 7, "fmdD", 0)}</g>${decoStar(10, 22, 5, "fmdS", 0)}${decoStar(50, 15, 5, "fmdS", 0)}` }
                ];
            }
        },
        terminal: {
            label: "Terminal",
            frame: { bg: "#070b07", content: "#070b07", title: "#0d140d", titleText: "#39ff7a", text: "#8fe8a8", border: "#1f4d2b" },
            placements: [],
            palette: { main: "#0d140d", outline: "#1f4d2b", detail: "#39ff7a", sparkle: "#b6ffcc" },
            colors: { main: "Tag background", outline: null, detail: "Glow & text", sparkle: null },
            pieces: () => [
                { fill: "frame", html: '<i class="fmdTermGlow"></i>' },
                { fill: "title", html: '<i class="fmdScan fmdScanSoft"></i>' },
                { w: 46, h: 19, edge: "top", from: "right", at: 72, inset: 2,
                  svg: '<path d="M.75 19 L.75 3.5 Q.75 .75 3.5 .75 L42.5 .75 Q45.25 .75 45.25 3.5 L45.25 19" class="fmdM fmdTermStroke" stroke-width="1.5"/>' +
                       '<path d="M9 5.5 L14 9.5 L9 13.5" class="fmdDs" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
                       '<rect x="18" y="12.5" width="9" height="2.2" class="fmdD fmdCursor"/>' }
            ]
        },
        ink: {
            label: "Ink (sumi-e)",
            frame: { bg: "#1a1917", content: "#1a1917", title: "#1a1917", titleText: "#efe8da", text: "#d9d2c4", border: "#3b3833" },
            placements: ["left", "right"],
            palette: { main: "#efe8da", outline: "#1a1917", detail: "#c23b2e", sparkle: "#f6efe2" },
            colors: { main: "Brush strokes", outline: null, detail: "Seal", sparkle: "Seal mark" },
            pieces: (p) => {
                const right = p === "right";
                return [
                    { fill: "titleline", html: '<svg viewBox="0 0 200 8" preserveAspectRatio="none"><path d="M0 5 Q30 1 70 4 T140 3 Q175 2 200 4 L198 6 Q160 8 120 6 T40 7 Q15 8 0 7Z" class="fmdM" opacity=".8"/></svg>' },
                    /* A bamboo sprig painted in a few strokes, the classic sumi-e subject */
                    { w: 30, h: 120, edge: right ? "right" : "left", at: "calc(100% - 112px)", inset: 5, flip: right ? "x" : "", cls: "fmdSway", svg: decoBamboo },
                    /* Ink splatter + the artist's red seal (a stamped signature) */
                    { w: 30, h: 30, corner: right ? "bl" : "br", dx: -9, dy: -9, cls: "fmdStamp",
                      svg: '<circle cx="2" cy="6" r="1.6" class="fmdM" opacity=".8"/><circle cx="5.5" cy="2" r=".9" class="fmdM" opacity=".7"/>' +
                           '<g transform="rotate(-6 17 17)"><rect x="6" y="6" width="22" height="22" rx="2.5" class="fmdD"/><rect x="8.5" y="8.5" width="17" height="17" rx="1.2" fill="none" class="fmdSs" stroke-width="1"/>' +
                           '<text x="17" y="21.6" text-anchor="middle" font-size="13" font-family="Yu Mincho, MS Mincho, Noto Serif CJK JP, serif" class="fmdS">印</text></g>' }
                ];
            }
        },
        spiderweb: {
            label: "Spiderweb",
            frame: { bg: "#18181b", content: "#18181b", title: "#202024", titleText: "#e2e2e6", text: "#cfcfd4", border: "#3a3a42" },
            placements: ["left", "right"],
            palette: { main: "#2b2b31", outline: "#9a9aa6", detail: "#e8e8ee", sparkle: "#e8e8ee" },
            colors: { main: "Spider", outline: "Web & legs", detail: "Eyes", sparkle: null },
            pieces: (p) => {
                const right = p === "right";
                return [
                    { w: 48, h: 48, corner: right ? "br" : "bl", dx: 0, dy: 0, flip: right ? "" : "x", svg: `<g opacity=".7" transform="scale(1.4)">${decoWeb()}</g>` },
                    { w: 20, h: 44, edge: "bottom", at: right ? "70%" : "30%", inset: 0, cls: "fmdDangle", svg: decoSpider }
                ];
            }
        },
        rose: {
            label: "Thorned rose",
            frame: { bg: "#1a1214", content: "#1a1214", title: "#24161a", titleText: "#f0d6dc", text: "#dccbcf", border: "#4a2a31" },
            placements: ["left", "right"],
            palette: { main: "#a8213b", outline: "#5e0f20", detail: "#3d6b3f", sparkle: "#5b8a52" },
            colors: { main: "Rose", outline: "Petal lines", detail: "Stem & leaves", sparkle: "Thorns" },
            pieces: (p) => {
                const right = p === "right";
                /* v1.6: the stem tiles down the whole side, so it fits any popup size */
                return [
                    { fill: right ? "roseR" : "roseL", html: '<i class="fmdStemLine"></i><i class="fmdStemThorns"></i>' },
                    /* the bloom sits right on top of the stem at every size */
                    { w: 36, h: 34, corner: right ? "tr" : "tl", dx: -28, dy: -15, flip: right ? "x" : "", svg: decoRose }
                ];
            }
        },
        deepsea: {
            label: "Deep sea",
            frame: { bg: "#07131d", content: "#07131d", title: "#0b1f2e", titleText: "#9ff3ea", text: "#c3e3e6", border: "#16384a" },
            placements: ["left", "right"],
            palette: { main: "#3fe0d0", outline: "#2a8f93", detail: "#3fe0d0", sparkle: "#9ff3ea" },
            colors: { main: "Jellyfish", outline: "Tentacles", detail: "Glow", sparkle: "Air bubbles" },
            pieces: (p) => {
                const right = p === "right";
                return [
                    { fill: "frame", html: '<i class="fmdSeaGlow"></i>' },
                    { w: 22, h: 96, edge: right ? "right" : "left", at: "calc(100% - 90px)", inset: 4, flip: right ? "" : "x", svg: decoKelp },
                    { w: 16, h: 40, edge: right ? "right" : "left", at: "calc(100% - 132px)", inset: 1, svg: decoAirBubbles },
                    { w: 36, h: 50, edge: right ? "right" : "left", at: "6px", inset: 5, svg: decoJelly }
                ];
            }
        },
        minimal: {
            label: "Minimal",
            frame: { bg: "#1d1e21", content: "#1d1e21", title: "#1d1e21", titleText: "#e6e7ea", text: "#c5c7cc", border: "#2f3136" },
            placements: [],
            palette: { main: "#1d1e21", outline: "#2f3136", detail: "#8fa3bf", sparkle: "#c8d3e2" },
            colors: { main: null, outline: null, detail: "Accent line", sparkle: null },
            pieces: () => [
                { fill: "topline", html: '<i class="fmdTopLine"></i>' }
            ]
        }
    });

    /* ---- v1.6: Lamb (Cute) ---- */
    /* droopy lamb ear (46x46), attached at its left end, tip hangs down-right. b = bubble colors */
    const lambEarSVG = (b) => {
        const M = b ? "fmbA fmbBs" : "fmdM fmdO", D = b ? "fmbC" : "fmdD";
        return `<g transform="rotate(30 2 12)"><path d="M2 8 C10 2 28 2 38 10 C44 15 42 24 34 25 C22 26 10 22 2 16Z" class="${M}" stroke-width="2" stroke-linejoin="round"/>` +
               `<path d="M6 11 C14 7 26 8 33 13 C36 16 35 20 31 20 C22 20 13 18 6 15Z" class="${D}"/></g>`;
    };
    /* little gold bell on a ribbon (32x28) */
    const lambBellSVG = (b) => {
        const M = b ? "fmbD fmbBs" : "fmdS fmdO", R = b ? "fmbCs" : "fmdDs";
        return `<path d="M4 2 C12 6 20 6 28 2" fill="none" class="${R}" stroke-width="3" stroke-linecap="round"/>` +
               `<path d="M16 6 C9 6 8 13 8 17 L6 21 L26 21 L24 17 C24 13 23 6 16 6Z" class="${M}" stroke-width="1.5" stroke-linejoin="round"/>` +
               `<circle cx="16" cy="23" r="2.6" class="${M}" stroke-width="1.2"/>` +
               '<path d="M11 12 C11 10 13 9 14 9" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>';
    };

    Object.assign(DECO_STYLES, {
        lamb: {
            label: "Lamb",
            frame: { bg: "#2a2624", content: "#2a2624", title: "#4a403b", titleText: "#f8efe6", text: "#eee4da", border: "#6b5d52" },
            placements: [],
            palette: { main: "#fbf6ee", outline: "#b9a794", detail: "#f2b9c3", sparkle: "#e7bf62" },
            colors: { main: "Wool", outline: "Outline", detail: "Inner ears & ribbon", sparkle: "Bell" },
            pieces: () => [
                /* wool cloud: rounded ends + a middle that repeats to any width */
                { fill: "wool", html: '<i class="fmdWoolL"></i><i class="fmdWoolM"></i><i class="fmdWoolR"></i>' },
                { w: 46, h: 46, corner: "tl", dx: -42, dy: 0, flip: "x", svg: lambEarSVG(false) },
                { w: 46, h: 46, corner: "tr", dx: -42, dy: 0, svg: lambEarSVG(false) },
                { w: 32, h: 28, edge: "bottom", at: "50%", inset: 4, cls: "fmdDangle", svg: lambBellSVG(false) }
            ]
        }
    });

    /* ---- v1.6: Cozy café (Cute) ---- b = bubble colors ---- */
    const cafeMugSVG = (b) => {
        const M = b ? "fmbA fmbBs" : "fmdM fmdO", D = b ? "fmbC" : "fmdD", O = b ? "fmbBs" : "fmdOs",
              S = b ? "fmbDs" : "fmdSs", H = b ? "fmbD" : "fmdS", Ms = b ? "fmbAs" : "fmdMs", Ol = b ? "fmbBs" : "fmdO";
        return `<g class="fmdRise" opacity=".75"><path d="M17 20 C13 15 21 12 17 6" class="${S}" fill="none" stroke-width="2.2" stroke-linecap="round"/>` +
               `<path d="M26 18 C22 12 31 9 26 2" class="${S}" fill="none" stroke-width="2.2" stroke-linecap="round"/></g>` +
               `<path d="M38 30 C48 29 48 43 37 42" class="${O}" fill="none" stroke-width="6" stroke-linecap="round"/>` +
               `<path d="M38 30 C48 29 48 43 37 42" class="${Ms}" fill="none" stroke-width="3" stroke-linecap="round"/>` +
               `<path d="M8 24 L40 24 L38 42 C37 47 33 50 28 50 L20 50 C15 50 11 47 10 42Z" class="${M}" stroke-width="2" stroke-linejoin="round"/>` +
               `<ellipse cx="24" cy="24" rx="16" ry="3.6" class="${D} ${Ol}" stroke-width="1.6"/>` +
               `<path d="M24 26.2 C22.2 24.6 20.8 24 21.4 23 C22 22 23.4 22.4 24 23.4 C24.6 22.4 26 22 26.6 23 C27.2 24 25.8 24.6 24 26.2Z" class="${H}"/>` +
               `<path d="M13 30 L14.5 41" class="${S}" stroke-width="2" stroke-linecap="round" opacity=".5"/>`;
    };
    const cafeCookieSVG = (b) => {
        const M = b ? "fmbC fmbBs" : "fmdD fmdO", O = b ? "fmbB" : "fmdOf";
        return `<circle cx="13" cy="13" r="11" class="${M}" stroke-width="1.8"/>` +
               `<g class="${O}"><circle cx="9" cy="10" r="1.8"/><circle cx="16" cy="9" r="1.5"/><circle cx="14" cy="16" r="1.9"/><circle cx="8" cy="16" r="1.3"/></g>`;
    };
    /* a little cat curled up asleep (56x32), z's bob once */
    const cafeCatSVG =
        '<path d="M44 30 C36 34 25 34 20 29" class="fmdOs" fill="none" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M10 31 C4 31 3 22 9 18 C14 14 24 13 34 14 C44 15 52 19 52 26 C52 30 49 31 46 31Z" class="fmdM fmdO" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M44 30 C36 34 25 34 20 29" class="fmdMs" fill="none" stroke-width="2.4" stroke-linecap="round"/>' +
        '<path d="M8 15 L7 6 L14 11Z M17 10 L22 4 L23 13Z" class="fmdM fmdO" stroke-width="1.8" stroke-linejoin="round"/>' +
        '<path d="M8.6 12.5 L8.3 8.6 L11.2 10.8Z M18.8 10 L21.2 7 L21.6 11.4Z" class="fmdD"/>' +
        '<path d="M6 22 C4 15 9 10 15 10 C21 10 25 14 24 21 C23 27 18 29 14 29 C9 29 7 26 6 22Z" class="fmdM fmdO" stroke-width="2"/>' +
        '<path d="M9.5 20 Q11.5 22 13.5 20 M16.5 19.5 Q18.5 21.5 20.5 19.5" class="fmdOs" fill="none" stroke-width="1.5" stroke-linecap="round"/>' +
        '<path d="M14.6 23.4 l1 .9 l1 -.9" class="fmdOs" fill="none" stroke-width="1.2" stroke-linecap="round"/>' +
        '<g class="fmdBob"><path d="M28 6 h5 l-5 6 h5" class="fmdSs" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M36 1 h3.4 l-3.4 4 h3.4" class="fmdSs" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/></g>';

    Object.assign(DECO_STYLES, {
        cafe: {
            label: "Cozy café",
            frame: { bg: "#2a221d", content: "#2a221d", title: "#4a3a2f", titleText: "#f6e9dc", text: "#ecdfd2", border: "#6e5442" },
            placements: [],
            palette: { main: "#f4e7d7", outline: "#6b4a35", detail: "#b9825a", sparkle: "#ffffff" },
            colors: { main: "Mug & cat", outline: "Outline", detail: "Coffee, cookie & stripes", sparkle: "Steam & heart" },
            pieces: () => [
                /* striped awning with a scalloped edge, any width */
                { fill: "awning", html: "<i></i>" },
                { w: 56, h: 32, edge: "top", from: "left", at: 14, inset: -18, svg: cafeCatSVG },
                { w: 50, h: 50, edge: "top", from: "right", at: 14, inset: -17, svg: cafeMugSVG(false) },
                { w: 26, h: 26, corner: "bl", dx: -11, dy: -11, svg: cafeCookieSVG(false) }
            ]
        }
    });

    /* ---- v1.6: Celestial (Discord-style glow) ---- b = bubble colors ---- */
    /* 4-point sparkle star */
    const celStar = (x, y, r, cls, tw) => {
        let d = "";
        for (let i = 0; i < 8; i++) {
            const a = i * Math.PI / 4 - Math.PI / 2, rr = i % 2 ? r * 0.38 : r;
            d += `${i ? "L" : "M"}${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
        }
        return `<path d="${d}Z" class="${cls}${tw ? " fmdTwinkle" : ""}"/>`;
    };
    const celPlus = (x, y, r, cls) =>
        `<path d="M${x} ${y - r} L${x} ${y + r} M${x - r} ${y} L${x + r} ${y}" class="${cls}" stroke-width="1.2" stroke-linecap="round" fill="none"/>`;
    /* crescent moon (56x76) with a little star hanging from its tip */
    const celMoonSVG = (b) => {
        const M = b ? "fmbA" : "fmdM", S = b ? "fmbC" : "fmdS", L = b ? "fmbDs" : "fmdOs";
        return `<path d="M40 8 C24 6 12 18 12 32 C12 46 24 56 38 54 C26 50 20 40 22 29 C24 18 31 11 40 8Z" class="${M}"/>` +
               '<path d="M38 54 C26 50 20 40 22 29 C24 18 31 11 40 8" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>' +
               `<g class="${b ? "" : "fmdDangle"}"><path d="M36 53 L36 66" class="${L}" stroke-width="1" opacity=".7"/>${celStar(36, 70, 5, S)}</g>`;
    };

    Object.assign(DECO_STYLES, {
        celestial: {
            label: "Celestial",
            frame: { bg: "#141831", content: "#141831", title: "#1e2448", titleText: "#ece8ff", text: "#dcd8f5", border: "#3b3f74" },
            placements: [],
            palette: { main: "#f6e3a1", outline: "#f3a6cf", detail: "#cbc5f3", sparkle: "#9ef0d6" },
            colors: { main: "Moon", outline: "Pink glow & stars", detail: "Clouds", sparkle: "Mint glow & stars" },
            pieces: () => [
                /* aurora glow, clouds and a shooting star above the title bar (any width) */
                { fill: "aurora", html: "<i></i>" },
                { fill: "clouds", html: "<i></i>" },
                { fill: "shoot", html: "<i></i><b></b>" },
                { w: 56, h: 76, corner: "tr", dx: -44, dy: -30, cls: "fmdMoonGlow", svg: celMoonSVG(false) },
                { w: 20, h: 96, edge: "right", at: "45%", inset: -6, cls: "fmdSoftGlow",
                  svg: celStar(6, 10, 4, "fmdS", true) + celPlus(15, 26, 3, "fmdOs") + celStar(16, 40, 2.5, "fmdOf") +
                       celStar(5, 60, 3.2, "fmdS", true) + celPlus(8, 78, 2.5, "fmdSs") + celStar(15, 88, 2, "fmdOf") },
                /* little constellation on the bottom-left corner */
                { w: 58, h: 46, corner: "bl", dx: -20, dy: -22, cls: "fmdSoftGlow",
                  svg: '<path d="M6 40 L22 28 L38 34 L52 16" class="fmdSs" fill="none" stroke-width="1" stroke-dasharray="2 3" opacity=".7"/>' +
                       celStar(6, 40, 3, "fmdOf") + celStar(22, 28, 4, "fmdS", true) + celStar(38, 34, 3, "fmdOf") +
                       celStar(52, 16, 4.5, "fmdS", true) + celPlus(30, 10, 2.5, "fmdOs") }
            ]
        }
    });

    /* ---- v1.6: Grin ball (a friend's character's hair accessories) ---- b = bubble colors ----
       a dark ball (40x40): sparkle eye on the left, open eye on the right
       (same on both balls, like in her art) and a big toothy grin */
    const grinBallSVG = (b) => {
        const M = b ? "fmbA" : "fmdM", O = b ? "fmbBs" : "fmdO", Of = b ? "fmbB" : "fmdOf", D = b ? "fmbC" : "fmdD";
        return `<circle cx="20" cy="20" r="17" class="${M} ${O}" stroke-width="2.4"/>` +
               `<path d="M12.5 4.5 L14.2 11.3 L21 13 L14.2 14.7 L12.5 21.5 L10.8 14.7 L4 13 L10.8 11.3Z" transform="rotate(40 12.5 13)" class="${D} ${O}" stroke-width=".9" stroke-linejoin="round"/>` +
               `<circle cx="28" cy="12.5" r="6" class="${D} ${O}" stroke-width="1"/><circle cx="28" cy="12.5" r="3.6" class="${Of}"/>` +
               `<path d="M3.1 22 Q20 28 36.9 22 A17 17 0 0 1 3.1 22Z" class="${D} ${O}" stroke-width="1.8" stroke-linejoin="round"/>` +
               `<path d="M8.5 23.6 L8.5 31.9 M13.5 24.6 L13.5 35.1 M20 25 L20 36.4 M26.5 24.6 L26.5 35.1 M31.5 23.6 L31.5 31.9" class="${O}" stroke-width="1.4" stroke-linecap="round"/>` +
               '<path d="M20.5 5 A13 13 0 0 1 24 4.3" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2" stroke-linecap="round"/>';
    };
    /* her green tie (44x38): a knot with two ruffled tails */
    const grinTieSVG = (b) => {
        const T = b ? "fmbD" : "fmdS", O = b ? "fmbBs" : "fmdO", Os = b ? "fmbBs" : "fmdOs";
        return `<path d="M19 10 C14 15 8 20 3 30 L8 28 L9.5 35 L14 30 L17 35 L19.5 28 L22 12Z" class="${T} ${O}" stroke-width="1.6" stroke-linejoin="round"/>` +
               `<path d="M25 10 C30 15 36 20 41 30 L36 28 L34.5 35 L30 30 L27 35 L24.5 28 L22 12Z" class="${T} ${O}" stroke-width="1.6" stroke-linejoin="round"/>` +
               `<path d="M12 25 L17 15 M32 25 L27 15" class="${Os}" stroke-width="1.1" stroke-linecap="round" opacity=".5" fill="none"/>` +
               `<ellipse cx="22" cy="8" rx="6" ry="5" class="${T} ${O}" stroke-width="1.6"/>`;
    };

    Object.assign(DECO_STYLES, {
        grinball: {
            label: "Grin ball",
            frame: { bg: "#2a2326", content: "#2a2326", title: "#6e4339", titleText: "#fbeee0", text: "#efe3d6", border: "#c99a3a" },
            placements: [],
            palette: { main: "#1f1d22", outline: "#0b0b0c", detail: "#ffffff", sparkle: "#5f8f3a" },
            colors: { main: "Balls", outline: "Outline & pupils", detail: "Teeth & eyes", sparkle: "Tie" },
            pieces: () => [
                /* one on each side of the title bar, like hair ties */
                { w: 40, h: 40, corner: "tl", dx: -37, dy: -5, cls: "fmdGrinRim",
                  svg: `<g class="fmdBounce"><g transform="rotate(-10 20 20)">${grinBallSVG(false)}</g></g>` },
                { w: 40, h: 40, corner: "tr", dx: -37, dy: -5, cls: "fmdGrinRim",
                  svg: `<g class="fmdBounce"><g transform="rotate(10 20 20)">${grinBallSVG(false)}</g></g>` },
                /* the green tie under the middle of the popup */
                { w: 44, h: 38, edge: "bottom", at: "50%", inset: 6, cls: "fmdGrinRim fmdDangle", svg: grinTieSVG(false) }
            ]
        }
    });

    /* ---- v1.6: Shoreline + Shark swirl (inspired by Discord profile effects) ---- b = bubble colors ---- */
    /* hibiscus (40x40) */
    const shoreHibiscusSVG = (b) => {
        const M = b ? "fmbA" : "fmdM", O = b ? "fmbBs" : "fmdO", D = b ? "fmbC" : "fmdD", Ds = b ? "fmbCs" : "fmdDs", S = b ? "fmbD" : "fmdS";
        let petals = "";
        for (let i = 0; i < 5; i++) {
            petals += `<ellipse cx="20" cy="10" rx="8" ry="10.5" transform="rotate(${i * 72 + 10} 20 20)" class="${M} ${O}" stroke-width="1.2"/>`;
        }
        return petals + `<circle cx="20" cy="20" r="6.5" class="${D}" opacity=".9"/>` +
               `<path d="M20 20 L27 11" class="${Ds}" stroke-width="1.6" stroke-linecap="round" fill="none"/>` +
               `<g class="${S}"><circle cx="27.5" cy="10.5" r="1.6"/><circle cx="25.5" cy="9" r="1.1"/><circle cx="29" cy="12.5" r="1.1"/></g>`;
    };
    /* shark silhouette (68x24), swimming right */
    const sharkSVG = (cls) =>
        `<path d="M12 12 L3 1 C6 6 6 9 7 12 C6 15 5 18 3 23Z M10 12 C20 7 30 6 34 6 L41 -3 L44 6 C55 7 62 9 67 12 C62 14.5 56 16 48 16.5 L43 22 L40 17 C30 18 20 17 10 12Z" class="${cls}"/>` +
        '<path d="M14 13.5 C26 16 40 16 58 14" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>';

    Object.assign(DECO_STYLES, {
        shoreline: {
            label: "Shoreline",
            /* the title bar itself becomes the shore (see style.css, needs "Title bar color" on) */
            frame: { bg: "#1a1528", content: "#1a1528", title: "#2c2450", titleText: "#f4efff", text: "#ddd6f2", border: "#4a3f78" },
            placements: [],
            palette: { main: "#ffd76a", outline: "#d9844a", detail: "#f06a8a", sparkle: "#fff6d8" },
            colors: { main: "Petals", outline: "Petal edges", detail: "Flower center", sparkle: "Pollen" },
            pieces: () => [
                { w: 40, h: 40, corner: "tr", dx: -30, dy: -30, cls: "fmdShoreFlower", svg: shoreHibiscusSVG(false) }
            ]
        },
        sharks: {
            label: "Sharks",
            frame: { bg: "#124b5e", content: "#124b5e", title: "#2a8fb5", titleText: "#f2fcff", text: "#d8f6f8", border: "#3d9db2" },
            placements: [],
            palette: { main: "#5d8ea6", outline: "#122230", detail: "#4fc3ff", sparkle: "#ffffff" },
            colors: { main: "Sharks", outline: null, detail: "Glow", sparkle: null },
            pieces: () => [
                /* two sharks cruising along the bottom (they swim when popup animations are on) */
                { fill: "sharklane", html: `<b><svg viewBox="-2 -4 72 30">${sharkSVG("fmdM")}</svg></b><b><svg viewBox="-2 -4 72 30">${sharkSVG("fmdM")}</svg></b>` }
            ]
        }
    });

    /* =========================================================
       v1.6.2: LUCKY DAYS + DARK MAID (designed by nene2nd)
       b = bubble colors
       ========================================================= */
    /* puffy four-leaf clover (40x40) with a little x in the middle */
    const luckyCloverSVG = (b) => {
        const M = b ? "fmbA" : "fmdM", O = b ? "fmbBs" : "fmdO", X = b ? "fmbBs" : "fmdOs";
        const leaves = '<circle cx="20" cy="11" r="8.5"/><circle cx="29" cy="20" r="8.5"/><circle cx="20" cy="29" r="8.5"/><circle cx="11" cy="20" r="8.5"/>';
        return `<g class="${M} ${O}" stroke-width="3">${leaves}</g><g class="${M}">${leaves}</g>` +
               '<ellipse cx="16" cy="8.5" rx="3.6" ry="2" fill="#fff" opacity=".5"/>' +
               `<path d="M17.2 17.2 L22.8 22.8 M22.8 17.2 L17.2 22.8" class="${X}" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
    };
    const LUCKY_HEART = "M12 21 C4 15 1 11 1 7 C1 3.5 3.8 1 7 1 C9.2 1 11 2.3 12 4 C13 2.3 14.8 1 17 1 C20.2 1 23 3.5 23 7 C23 11 20 15 12 21Z";
    /* glossy pink heart (24x22) */
    const luckyHeartSVG = (b) => `<path d="${LUCKY_HEART}" class="${b ? "fmbC" : "fmdD"}"/>` +
        '<ellipse cx="7" cy="6.2" rx="2.6" ry="1.9" fill="#fff" opacity=".75" transform="rotate(-25 7 6.2)"/>';
    /* lilac outline heart (24x22) */
    const luckyHeartLineSVG = (b) => `<path d="${LUCKY_HEART}" fill="none" class="${b ? "fmbDs" : "fmdSs"}" stroke-width="2.6" stroke-linejoin="round"/>`;
    /* tiny sparkles: each one twinkles on its own beat */
    const luckyTw = (delay, inner) => `<g class="fmdLuckyTw" style="animation-delay: calc(${delay}s * var(--fm-anim-speed, 1))">${inner}</g>`;
    const luckyPlus = (x, y, r, rot) => `<path d="M${x} ${y - r} L${x} ${y + r} M${x - r} ${y} L${x + r} ${y}" transform="rotate(${rot} ${x} ${y})" class="fmdSs" stroke-width="2.2" stroke-linecap="round"/>`;
    const luckyRing = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" class="fmdSs" stroke-width="1.6"/>`;
    const luckyDot = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" class="fmdS"/>`;
    const luckyMini = (x, y, s, svg) => `<g transform="translate(${x} ${y}) scale(${s})">${svg}</g>`;

    /* Dark maid: skull bow (54x44), drawn after nene2nd's sketch: big puffy
       loops with a fold line, frilly lace peeking out around them, short
       tails with lace tips, and a skull in the knot */
    const maidBowSVG = (b) => {
        const L = b ? "fmbA" : "fmdM", Ls = b ? "fmbAs" : "fmdMs", D = b ? "fmbB" : "fmdD", M = b ? "fmbA" : "fmdM";
        const ink = "#120a1a";
        const loops = "M27 21 C22 13 14 5 7 7 C1.5 9 0.5 18 3.5 25 C6.5 31.5 15 31.5 20.5 27.5 C23.5 25.5 25.5 23 27 21Z " +
                      "M27 21 C32 13 40 5 47 7 C52.5 9 53.5 18 50.5 25 C47.5 31.5 39 31.5 33.5 27.5 C30.5 25.5 28.5 23 27 21Z";
        const tails = "M24.5 24 C22.5 30 19.5 35 15.5 39.5 C18 39 20 39.4 21.8 41.2 C24.5 35.5 26.6 30 27.6 25Z " +
                      "M29.5 24 C31.5 30 34.5 35 38.5 39.5 C36 39 34 39.4 32.2 41.2 C29.5 35.5 27.4 30 26.4 25Z";
        return '<g transform="rotate(-8 27 22)">' +
               /* lace: a slightly bigger copy behind the loops, with a scalloped (dotted) rim */
               `<g transform="translate(27 20) scale(1.13) translate(-27 -20)"><path d="${loops}" class="${L}"/>` +
               `<path d="${loops}" fill="none" class="${Ls}" stroke-width="3.6" stroke-dasharray="0 3.6" stroke-linecap="round"/></g>` +
               `<path d="M15.5 39.5 C18 39 20 39.4 21.8 41.2 M38.5 39.5 C36 39 34 39.4 32.2 41.2" fill="none" class="${Ls}" stroke-width="3.4" stroke-dasharray="0 3" stroke-linecap="round"/>` +
               `<path d="${tails}" class="${D}" stroke="${ink}" stroke-width="1.5" stroke-linejoin="round"/>` +
               `<path d="${loops}" class="${D}" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"/>` +
               /* folds + soft shine */
               `<path d="M7.5 11 C13 14 18.5 18 24 20.5 M46.5 11 C41 14 35.5 18 30 20.5 M5 24.5 C11 25 17 24 23.5 22 M49 24.5 C43 25 37 24 30.5 22" fill="none" stroke="${ink}" stroke-width="1" stroke-linecap="round" opacity=".55"/>` +
               '<path d="M6 13 C7 10.5 9.5 9.5 12 10 M42 10 C44.5 9.5 47 10.5 48 13" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".28"/>' +
               /* skull knot */
               `<circle cx="27" cy="20" r="6.3" class="${M}" stroke="${ink}" stroke-width="1.2"/>` +
               `<rect x="24" y="22.6" width="6" height="4.6" rx="1.4" class="${M}" stroke="${ink}" stroke-width="1.1"/>` +
               `<circle cx="27" cy="20" r="5.7" class="${M}"/><rect x="24.6" y="22" width="4.8" height="4.6" rx="1" class="${M}"/>` +
               `<ellipse cx="24.8" cy="20" rx="1.6" ry="1.8" fill="${ink}"/><ellipse cx="29.2" cy="20" rx="1.6" ry="1.8" fill="${ink}"/>` +
               `<path d="M27 22.3 L26.2 23.6 L27.8 23.6Z" fill="${ink}"/>` +
               `<path d="M25.8 25 L25.8 27 M27 25 L27 27.2 M28.2 25 L28.2 27" stroke="${ink}" stroke-width=".7"/></g>`;
    };
    /* thin ribbon bow with two long tails that blow in the wind (72x44) */
    const maidRibbonPaths = (d, cls) => `<path d="${d}" class="fmdOs" stroke-width="5" opacity=".35"/><path d="${d}" class="fmdDs" stroke-width="3"/>`;
    const maidRibbonSVG =
        '<g fill="none" stroke-linecap="round" stroke-linejoin="round">' +
        maidRibbonPaths("M14 12 C6 1 -3 8 4 14 C8 18 12 14 14 12Z") + maidRibbonPaths("M14 12 C10 -3 23 -4 21 6 C20 10 17 11 14 12Z") +
        `<g class="fmdMaidTail">${maidRibbonPaths("M14 12 C24 17 34 14 46 18 C54 21 60 24 67 21")}</g>` +
        `<g class="fmdMaidTail fmdMaidTail2">${maidRibbonPaths("M14 12 C20 22 30 28 42 30 C50 31 55 34 59 39")}</g></g>` +
        '<g class="fmdOf"><circle cx="12.3" cy="12" r="1.9"/><circle cx="15.7" cy="12" r="1.9"/><circle cx="14" cy="10.3" r="1.9"/><circle cx="14" cy="13.7" r="1.9"/></g>' +
        '<circle cx="14" cy="12" r="1" class="fmdD"/>';
    /* leaning candle with a glowing flame (50x76) */
    const maidCandleSVG =
        '<g transform="rotate(14 18 74)">' +
        '<g class="fmdMaidHalo"><circle cx="18" cy="16" r="21" class="fmdS" opacity=".12"/><circle cx="18" cy="16" r="13" class="fmdS" opacity=".2"/></g>' +
        '<path d="M12 30 C12 28 13 27 15 27 L21 27 C23 27 24 28 24 30 L24 72 C24 74 23 75 21 75 L15 75 C13 75 12 74 12 72Z" class="fmdM fmdO" stroke-width="1.4"/>' +
        '<rect x="20.2" y="30" width="2.6" height="42" rx="1.3" class="fmdOf" opacity=".4"/>' +
        '<path d="M12.6 29 C12.6 33 13.6 35 13.6 39 C13.6 41.5 16.4 41.5 16.4 39 L16.4 32 C17 35 19.6 35 19.6 32 L19.6 28.4Z" class="fmdM"/>' +
        '<path d="M13.6 39 C13.6 41.5 16.4 41.5 16.4 39 L16.4 32 C17 35 19.6 35 19.6 32" fill="none" class="fmdOs" stroke-width="1" opacity=".7"/>' +
        '<path d="M18 27.4 L18 23" stroke="#3a2a2a" stroke-width="1.4" stroke-linecap="round"/>' +
        '<g class="fmdMaidFlame"><path d="M18 7 C22 13 23.5 18 21.8 22 C21 24.6 15 24.6 14.2 22 C12.5 18 14 13 18 7Z" class="fmdS"/>' +
        '<path d="M18 14 C20 17 20.4 20 19.4 22 C18.8 23.2 17.2 23.2 16.6 22 C15.6 20 16 17 18 14Z" fill="#fff" opacity=".7"/></g></g>';
    /* maid headpiece: a ruffled band over the title bar. It's redrawn to
       the band's real width (see watchMaidCaps), so a bigger popup gets a
       longer band with MORE ruffles instead of stretched ones. w = width
       in drawing units (30 units = the band's height). */
    const maidCapSVGFor = (w) => {
        w = Math.max(60, Math.round(w));
        const q = (t, a, c, e) => (1 - t) * (1 - t) * a + 2 * t * (1 - t) * c + t * t * e;
        const out = (t) => [q(t, 0, w / 2, w), q(t, 27, -8, 23)];
        const inn = (t) => [q(t, 3, w / 2, w - 3), q(t, 31, 8, 29)];
        const f = (n) => n.toFixed(1);
        const n = Math.max(5, Math.round(w / 34));        /* one ruffle every ~34 units */
        const step = 0.88 / n, rx = (w * step) / 2 + 1.5;
        let bumps = "", lines = "";
        for (let i = 0; i < n; i++) {
            const t = 0.06 + step / 2 + i * step, [x, y] = out(t);
            bumps += `<ellipse cx="${f(x)}" cy="${f(y + 1.6)}" rx="${f(rx)}" ry="3.4" vector-effect="non-scaling-stroke"/>`;
            if (i > 0) {
                const tb = t - step / 2, [ox, oy] = out(tb), [ix, iy] = inn(tb);
                lines += `M${f(ox)} ${f(oy + 1.5)} L${f(ix)} ${f(iy - .5)} `;
            }
        }
        const W = f(w), H = f(w / 2);
        return `<svg viewBox="0 0 ${W} 30" preserveAspectRatio="none">` +
               `<g class="fmdM fmdO" stroke-width="1.5">${bumps}</g>` +
               `<path d="M0 27 Q${H} -8 ${W} 23 L${f(w - 3)} 29 Q${H} 8 3 31Z" class="fmdM"/>` +
               `<path d="M1.5 29 Q${H} 2 ${f(w - 1.5)} 26 L${f(w - 3)} 29 Q${H} 8 3 31Z" class="fmdOf" opacity=".35"/>` +
               `<path d="${lines}" class="fmdOs" stroke-width="1.2" vector-effect="non-scaling-stroke" opacity=".8"/>` +
               `<path d="M3 31 Q${H} 8 ${f(w - 3)} 29" class="fmdOs" stroke-width="1.5" vector-effect="non-scaling-stroke"/>` +
               `<path d="M0 27 L3 31 M${W} 23 L${f(w - 3)} 29" class="fmdOs" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>`;
    };
    const maidCapSVG = maidCapSVGFor(240);

    /* Redraws each maid headpiece when its popup is resized (cheap: only
       when the width really changes, by a few px) */
    let maidCapObserver = null;
    function watchMaidCaps() {
        const caps = document.querySelectorAll(".fmDecoFill-maidcap:not([data-fm-cap])");
        if (!caps.length) return;
        if (!maidCapObserver) {
            maidCapObserver = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    const el = entry.target;
                    if (!el.isConnected) { maidCapObserver.unobserve(el); return; }
                    const h = entry.contentRect.height;
                    if (!h) return;
                    /* wider popups get a slightly taller, rounder band (up to 1.5x) */
                    const s = parseFloat(getComputedStyle(el).getPropertyValue("--fmd-s")) || 1;
                    const k = Math.min(1.5, Math.max(1, 1 + (entry.contentRect.width / s - 260) / 800)).toFixed(2);
                    if (el.style.getPropertyValue("--fm-cap-k") !== k) el.style.setProperty("--fm-cap-k", k);
                    const units = Math.round((entry.contentRect.width / (h / 1)) * 30 / 4) * 4;
                    if (units > 0 && String(units) !== el.dataset.fmCapW) {
                        el.dataset.fmCapW = String(units);
                        el.innerHTML = maidCapSVGFor(units);
                    }
                });
            });
        }
        caps.forEach((el) => {
            el.dataset.fmCap = "1";
            maidCapObserver.observe(el);
        });
    }

    Object.assign(DECO_STYLES, {
        lucky: {
            label: "Lucky days",
            /* the title bar gets a teal-to-green gradient (needs "Title bar color" on) */
            frame: { bg: "#2c302d", content: "#2c302d", title: "#55c27a", titleText: "#f4fff2", text: "#e4f2e6", border: "#3f7a46" },
            placements: [],
            palette: { main: "#a6ec74", outline: "#46a35a", detail: "#ffb0cf", sparkle: "#c9a8ff" },
            colors: { main: "Clovers", outline: "Clover edges", detail: "Hearts", sparkle: "Sparkles" },
            pieces: () => [
                { w: 40, h: 40, corner: "tl", dx: -18, dy: -27, cls: "fmdLuckyFloat", svg: luckyCloverSVG(false) },
                { w: 40, h: 40, corner: "tr", dx: -20, dy: -26, cls: "fmdLuckyFloat fmdLuckyFloat2", svg: luckyCloverSVG(false) },
                { w: 26, h: 26, edge: "right", at: "26px", inset: 8, cls: "fmdLuckyFloat fmdLuckyFloat3", svg: luckyMini(0, 0, .65, luckyCloverSVG(false)) },
                { w: 54, h: 16, edge: "top", from: "left", at: 46, inset: -2, cls: "fmdLuckyBits",
                  svg: luckyTw(0, luckyPlus(8, 8, 4.5, -15)) + luckyTw(-.7, luckyDot(18, 11, 1.4)) + luckyTw(-1.4, luckyRing(28, 9, 2.8)) + luckyTw(-2, luckyDot(38, 4, 1.3)) },
                { w: 24, h: 22, edge: "top", from: "right", at: 72, inset: -4, cls: "fmdLuckyFloat fmdLuckyFloat2", svg: luckyMini(2, 2, .8, luckyHeartLineSVG(false)) },
                { w: 24, h: 22, edge: "left", at: "20%", inset: 4, cls: "fmdLuckyFloat fmdLuckyFloat3", svg: luckyMini(2, 2, .8, luckyHeartLineSVG(false)) },
                { w: 26, h: 24, edge: "left", at: "56%", inset: 10, cls: "fmdLuckyFloat", svg: luckyMini(1, 1, 1, luckyHeartSVG(false)) },
                { w: 22, h: 22, edge: "left", at: "70%", inset: 8, cls: "fmdLuckyFloat fmdLuckyFloat2", svg: luckyMini(0, 0, .55, luckyCloverSVG(false)) },
                { w: 22, h: 20, edge: "right", at: "40%", inset: 9, cls: "fmdLuckyFloat fmdLuckyFloat3", svg: luckyMini(0, 0, .9, luckyHeartSVG(false)) },
                { w: 16, h: 36, edge: "right", at: "62%", inset: -2, cls: "fmdLuckyBits",
                  svg: luckyTw(-.4, luckyRing(8, 6, 2.6)) + luckyTw(-1.6, luckyPlus(8, 22, 3.5, 45)) + luckyTw(-2.3, luckyDot(4, 32, 1.2)) },
                { w: 64, h: 22, edge: "bottom", at: "16%", inset: -3, cls: "fmdLuckyBits",
                  svg: luckyTw(-.9, luckyPlus(6, 10, 4, 45)) + luckyTw(-1.8, luckyRing(20, 8, 2.6)) + luckyMini(34, 0, .5, luckyCloverSVG(false)) },
                { w: 38, h: 20, edge: "bottom", at: "82%", inset: -3, cls: "fmdLuckyBits",
                  svg: luckyMini(0, 1, .72, luckyHeartSVG(false)) + luckyTw(-1.1, luckyPlus(30, 10, 3.5, 45)) }
            ]
        },
        maid: {
            label: "Dark maid",
            /* the title bar gets a dark-to-purple gradient (needs "Title bar color" on) */
            frame: { bg: "#1d1524", content: "#1d1524", title: "#5b3f86", titleText: "#f1e9ff", text: "#e2d8ef", border: "#5b3f86" },
            placements: [],
            palette: { main: "#e8def4", outline: "#b4a0d4", detail: "#3d2163", sparkle: "#ffcf6b" },
            colors: { main: "Lace & candle", outline: "Lace edges", detail: "Bow & ribbon", sparkle: "Flame" },
            pieces: () => [
                { fill: "maidcap", html: maidCapSVG },
                { w: 54, h: 44, corner: "tl", dx: -24, dy: -38, cls: "fmdMaidBow", svg: maidBowSVG(false) },
                { w: 72, h: 44, corner: "bl", dx: -16, dy: -28, cls: "fmdMaidRibbon", svg: maidRibbonSVG },
                { w: 50, h: 76, corner: "br", dx: -22, dy: -30, cls: "fmdMaidCandle", svg: maidCandleSVG }
            ]
        }
    });

    const DECO_STYLE_CHOICES = Object.keys(DECO_STYLES);
    const DECO_PLACEMENT_CHOICES = ["side", "bottom", "none", "left", "right"];
    const DECO_PLACEMENT_LABELS = {
        side: "Tail on the side",
        bottom: "Tail at the bottom",
        none: "No tail",
        left: "Top-left corner",
        right: "Top-right corner"
    };

    /* Corner styles: a main cluster on the chosen top corner, a
       smaller one on the opposite bottom corner, and a few tiny
       ones trailing down the opposite side */
    function decoCornerPieces(p, main, opposite, trail) {
        const right = p === "right";
        return [
            { ...main, corner: right ? "tr" : "tl", mirror: right },
            { ...opposite, corner: right ? "bl" : "br", mirror: right },
            { ...trail, edge: right ? "left" : "right", at: "34%", inset: -8 }
        ];
    }

    /* ---- settings ---- */

    function readSavedDeco() {
        const style = localStorage.getItem(DECO_LS.style);
        const placement = localStorage.getItem(DECO_LS.placement);
        const size = Number(localStorage.getItem(DECO_LS.size));
        const colors = {};
        const hex = (v) => /^#[0-9a-f]{6}$/i.test(v || "") ? v : null;

        Object.keys(DECO_COLOR_DEFAULTS).forEach((key) => {
            colors[key] = hex(localStorage.getItem(DECO_LS[key])) || DECO_COLOR_DEFAULTS[key];
        });

        /* Older settings only had "Match my theme": ON = theme, OFF = own colors */
        const savedMode = localStorage.getItem(DECO_LS.colorMode);
        const colorMode = DECO_COLOR_MODES.includes(savedMode)
            ? savedMode
            : (localStorage.getItem(DECO_LS.match) === "false" ? "own" : "theme");

        const st = {
            style: DECO_STYLES[style] ? style : "none",
            placement: DECO_PLACEMENT_CHOICES.includes(placement) ? placement : "side",
            size: Number.isInteger(size) && size >= 70 && size <= 150 ? size : 100,
            colorMode,
            menu: localStorage.getItem(DECO_LS.menu) === "true",
            frame: localStorage.getItem(DECO_LS.frame) === "true",
            frameCustom: localStorage.getItem(DECO_LS.frameCustom) === "true",
            frameBorder: localStorage.getItem(DECO_LS.frameBorder) === "true",
            frameColors: {},
            colors
        };

        DECO_FRAME_PICKERS.forEach(([k, ls]) => {
            st.frameColors[k] = hex(localStorage.getItem(DECO_LS[ls]));
        });

        return normalizeDecoPlacement(st);
    }

    function normalizeDecoPlacement(st) {
        const allowed = DECO_STYLES[st.style].placements;

        if (allowed.length && !allowed.includes(st.placement)) {
            st.placement = allowed[0];
        }

        st.match = st.colorMode === "theme";
        return st;
    }

    let liveDeco = null;

    /* Title bar + border colors: the style's own, or your picked
       ones once you've changed them */
    function resolveDecoFrame(st) {
        const base = (DECO_STYLES[st.style] && DECO_STYLES[st.style].frame) || DECO_FRAME_FALLBACK;
        const own = st.frameCustom && st.frameColors ? st.frameColors : {};

        return {
            title: own.title || base.title,
            titleText: own.titleText || base.titleText,
            border: own.border || base.border
        };
    }

    /* The 4 decoration colors in use, or null for "Match my theme" */
    function resolveDecoColors(st) {
        const style = DECO_STYLES[st.style];

        if (st.colorMode === "style" && style && style.palette) {
            return { ...DECO_COLOR_DEFAULTS, ...style.palette };
        }

        if (st.colorMode === "own") {
            return st.colors;
        }

        return null;
    }

    function applySavedDeco() {
        applyDeco(readSavedDeco());
    }

    function applyDeco(st) {
        liveDeco = st;
        const root = document.documentElement;
        const on = st.style !== "none";
        const colors = resolveDecoColors(st);

        root.style.setProperty("--fmdeco-size", String(st.size / 100));
        root.classList.toggle("fmDecoCustomColors", Boolean(colors));
        root.classList.toggle("fmDecoOnMenu", st.menu);

        if (colors) {
            root.style.setProperty("--fmdeco-c-main", colors.main);
            root.style.setProperty("--fmdeco-c-outline", colors.outline);
            root.style.setProperty("--fmdeco-c-detail", colors.detail);
            root.style.setProperty("--fmdeco-c-sparkle", colors.sparkle);
        }

        /* Title bar and border colors, each with its own switch.
           Only decorated popups get them, never the mod menu. */
        const frame = resolveDecoFrame(st);
        root.classList.toggle("fmDecoFrameOn", on && Boolean(st.frame));
        root.classList.toggle("fmDecoFrameBorderOn", on && Boolean(st.frameBorder));
        root.style.setProperty("--fmframe-title", frame.title);
        root.style.setProperty("--fmframe-titletext", frame.titleText);
        root.style.setProperty("--fmframe-border", frame.border);

        lastThemeDecoColors = "";
        updateDecorations(true);
    }

    /* ---- building + placing ---- */

    /* Positions are measured from the popup's OUTER frame (its border
       plus FlockMod's resize bars), read per side into --fmdeco-ft /
       -fr / -fb / -fl, so nothing sinks into the frame. */
    function decoPieceHTML(piece) {
        /* Overlays that follow the popup's own box (never scaled) */
        if (piece.fill) {
            return `<div class="fmDecoPiece fmDecoFill fmDecoFill-${piece.fill}">${piece.html || ""}</div>`;
        }

        const pos = [];
        let origin = "center";
        const side = { top: "--fmdeco-ft", bottom: "--fmdeco-fb", left: "--fmdeco-fl", right: "--fmdeco-fr" };

        if (piece.corner) {
            const v = piece.corner[0] === "t" ? "top" : "bottom";
            const h = piece.corner[1] === "l" ? "left" : "right";
            pos.push(`${v}: calc(${piece.dy}px - var(${side[v]}, 0px))`, `${h}: calc(${piece.dx}px - var(${side[h]}, 0px))`);
            /* v1.6: grow from the popup's own corner (not the far side of
               the piece), so bigger decorations stay hugging the popup */
            const ox = h === "left" ? -piece.dx : piece.w + piece.dx;
            const oy = v === "top" ? -piece.dy : piece.h + piece.dy;
            origin = `${ox}px ${oy}px`;
        } else if (piece.edge === "top") {
            pos.push(`bottom: calc(100% + var(--fmdeco-ft, 0px) - ${piece.inset}px)`,
                piece.from === "center" ? `left: calc(50% - ${piece.w / 2}px)` : `${piece.from}: ${piece.at}px`);
            origin = "center bottom";
        } else if (piece.edge === "bottom") {
            pos.push(`top: calc(100% + var(--fmdeco-fb, 0px) - ${piece.inset}px)`, `left: calc(${piece.at} - ${piece.w / 2}px)`);
            origin = "center top";
        } else if (piece.edge === "right") {
            pos.push(`left: calc(100% + var(--fmdeco-fr, 0px) - ${piece.inset}px)`, `top: ${piece.at}`);
            origin = "left center";
        } else if (piece.edge === "left") {
            pos.push(`right: calc(100% + var(--fmdeco-fl, 0px) - ${piece.inset}px)`, `top: ${piece.at}`);
            origin = "right center";
        }

        /* Tails wag on open, unless the piece brings its own animation */
        const tail = (piece.edge === "right" || piece.edge === "bottom") && !piece.cls ? " fmDecoTail" : "";
        const extra = piece.cls ? ` ${piece.cls}` : "";
        const flip = piece.flip || (piece.mirror ? "x" : "");
        const flipCss = { x: "scaleX(-1)", y: "scaleY(-1)", xy: "scale(-1, -1)" }[flip];

        return `<div class="fmDecoPiece${tail}${extra} fmDecoEdge-${piece.edge || "corner"}" style="${pos.join("; ")}; width: ${piece.w}px; height: ${piece.h}px; transform-origin: ${origin};">` +
               `<svg viewBox="0 0 ${piece.w} ${piece.h}" width="${piece.w}" height="${piece.h}"${flipCss ? ` style="transform: ${flipCss}"` : ""}>${piece.svg}</svg></div>`;
    }

    function buildDecoHTML(st) {
        const style = DECO_STYLES[st.style] || DECO_STYLES.none;
        return style.pieces(st.placement).map(decoPieceHTML).join("");
    }

    function decoSignature(st) {
        return `${st.style}|${st.placement}`;
    }

    /* "Match my theme": read the colors your popups really show
       (works on any FlockMod theme, with or without mod colors) */
    let lastThemeDecoColors = "";

    function refreshThemeDecoColors() {
        const root = document.documentElement;
        const popups = [...document.querySelectorAll('.dialog.dialogVisible:not([name="themeModMenu"]):not([name="themeModReference"])')];
        const popup = popups[0] || document.querySelector('.dialog:not([name="themeModMenu"])');
        const bar = (popup && (popup.querySelector(".dialogTitlebar:not(.inactive)") || popup.querySelector(".dialogTitlebar")));

        const usable = (c) => c && c !== "transparent" && !/rgba\([^)]*,\s*0\)$/.test(c);

        let main = bar ? getComputedStyle(bar).backgroundColor : "";
        let outline = popup ? getComputedStyle(popup).borderTopColor : "";
        let detail = "";

        if (root.classList.contains("flockmodSidebarAccentActive")) {
            detail = getComputedStyle(root).getPropertyValue("--flockmod-custom-sidebar-accent").trim();
        } else {
            const fill = document.querySelector("#sidebar .fmSlider .fmSelectedArea");
            detail = fill ? getComputedStyle(fill).backgroundColor : "";
        }

        if (!usable(main)) main = "#4f4f55";
        if (!usable(outline)) outline = "#707379";
        if (!usable(detail)) detail = "#378de4";

        const sig = `${main}|${outline}|${detail}`;

        if (sig !== lastThemeDecoColors) {
            lastThemeDecoColors = sig;
            root.style.setProperty("--fmdeco-t-main", main);
            root.style.setProperty("--fmdeco-t-outline", outline);
            root.style.setProperty("--fmdeco-t-detail", detail);
        }
    }

    /* Runs in the 500ms loop (and right after a change): gives every
       popup its decoration box, rebuilding only when the style changed */
    function updateDecorations(force) {
        const st = liveDeco;
        queueMicrotask(watchMaidCaps);   /* v1.6.2: after this run builds any new headpieces */

        if (!st) {
            return;
        }

        const on = st.style !== "none" && customizationsEnabled;
        const sig = decoSignature(st);

        /* v1.6: lets style.css paint the title bar for some styles (Shoreline, Shark swirl) */
        const rootEl = document.documentElement;
        const decoName = on ? st.style : "";
        if ((rootEl.dataset.fmDeco || "") !== decoName) {
            if (decoName) rootEl.dataset.fmDeco = decoName;
            else delete rootEl.dataset.fmDeco;
        }

        /* FlockMod's popups can live anywhere on the page (not only
           in #dialogContainer), so every ".dialog" is checked. The
           little preview box in the mod menu isn't a .dialog. */
        document.querySelectorAll(".dialog").forEach((dialog) => {
            const isMenu = dialog.getAttribute("name") === "themeModMenu";
            let box = dialog.querySelector(":scope > .fmDeco");

            if (!on || (isMenu && !st.menu)) {
                if (box) {
                    box.remove();
                    dialog.classList.remove("fmHasDeco");
                }
                return;
            }

            if (!box) {
                box = document.createElement("div");
                box.className = "fmDeco";
                box.setAttribute("aria-hidden", "true");
                dialog.appendChild(box);
                dialog.classList.add("fmHasDeco");
            }

            if (force || box.dataset.sig !== sig) {
                box.dataset.sig = sig;
                box.innerHTML = buildDecoHTML(st);
            }

            measureDecoFrame(dialog, box);
        });

        if (on && st.match) {
            refreshThemeDecoColors();
        }
    }


    /* How far the popup's frame (border + FlockMod's resize bars)
       reaches past its inside edge, per side. Cheap: 4 rectangles,
       only written when something changed. */
    function measureDecoFrame(dialog, box) {
        const d = dialog.getBoundingClientRect();

        if (!d.width || !d.height) {
            return; /* hidden or minimized: keep the last values */
        }

        const inTop = d.top + dialog.clientTop;
        const inLeft = d.left + dialog.clientLeft;
        const inRight = inLeft + dialog.clientWidth;
        const inBottom = inTop + dialog.clientHeight;

        const bar = (cls) => {
            const el = dialog.querySelector(`:scope > .dialogSize.${cls}`);
            const r = el ? el.getBoundingClientRect() : null;
            return r && r.width && r.height ? r : null;
        };

        const clamp = (n) => Math.round(Math.max(0, Math.min(40, n)));
        const t = bar("sbTop");
        const r = bar("sbRight");
        const b = bar("sbBottom");
        const l = bar("sbLeft");

        const frame = {
            ft: clamp(Math.max(inTop - d.top, t ? inTop - t.top : 0)),
            fr: clamp(Math.max(d.right - inRight, r ? r.right - inRight : 0)),
            fb: clamp(Math.max(d.bottom - inBottom, b ? b.bottom - inBottom : 0)),
            fl: clamp(Math.max(inLeft - d.left, l ? inLeft - l.left : 0))
        };

        /* Title bar height + border width, for the overlay pieces */
        const titlebar = dialog.querySelector(".dialogTitlebar");
        const tr = titlebar ? titlebar.getBoundingClientRect() : null;
        frame.tb = tr && tr.height ? Math.round(Math.max(0, Math.min(80, tr.bottom - inTop))) : 30;
        frame.bw = Math.round(Math.max(0, Math.min(10, dialog.clientTop)));

        /* v1.6: decorations grow a little on bigger popups (up to 1.5x),
           so they don't look tiny on a large chat window */
        const auto = Math.round(Math.min(1.5, Math.max(1, Math.min(d.width / 360, d.height / 260))) * 20) / 20;

        const sig = `${frame.ft}|${frame.fr}|${frame.fb}|${frame.fl}|${frame.tb}|${frame.bw}|${auto}`;

        if (box.dataset.frame !== sig) {
            box.dataset.frame = sig;
            Object.entries(frame).forEach(([k, v]) => box.style.setProperty(`--fmdeco-${k}`, `${v}px`));
            box.style.setProperty("--fmdeco-auto", String(auto));
        }
    }

    /* ---- menu (Interface panel) ---- */

    function buildDecoRowsHTML() {
        const toggle = (id) => `
            <label class="themeModToggle">
                <input type="checkbox" id="${id}">
                <span class="themeModToggleTrack">
                    <span class="themeModToggleOption themeModToggleOff">OFF</span>
                    <span class="themeModToggleOption themeModToggleOn">ON</span>
                    <span class="themeModToggleThumb"></span>
                </span>
            </label>`;

        const picker = (attr, key, label, value) => `
    <div class="themeModSetting themeModNoDivider themeModDecoColorRow" data-${attr}-row="${key}">
        <div class="themeModSettingText"><div class="themeModSettingName" data-${attr}-label="${key}">${label}</div></div>
        <input type="color" data-${attr}="${key}" value="${value}">
    </div>`;

        return `
<div class="themeModSubsectionTitle themeModSpacingSubsection">
    Popup Decorations
</div>

<div class="themeModSetting themeModNoDivider fmStyleRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Style</div>
        <div class="themeModSettingDescription">
            Ears, tails, flowers and more on every popup. They never block clicks.
        </div>
    </div>
    <select id="themeModDecoStyle" class="themeModSelect fmStyleHiddenSelect" tabindex="-1" aria-hidden="true">
        ${DECO_STYLE_CHOICES.map((k) => `<option value="${k}">${DECO_STYLES[k].label}</option>`).join("")}
    </select>
</div>

<div class="themeModDecoPreviewWrap">
    <div class="themeModDecoStage">
        <div class="themeModDecoPreview">
            <div class="themeModDecoPreviewBar">Chat</div>
            <div class="themeModDecoPreviewBody"></div>
            <div class="fmDeco" aria-hidden="true"></div>
        </div>
    </div>
</div>

<div class="themeModSetting themeModNoDivider themeModDecoOptionRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Placement</div>
        <div class="themeModSettingDescription">Where the tail or decorations go.</div>
    </div>
    <select id="themeModDecoPlacement" class="themeModSelect"></select>
</div>

<div class="themeModSetting themeModNoDivider themeModDecoOptionRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Decoration Size</div>
        <div class="themeModSettingDescription">Makes the decorations smaller or bigger.</div>
    </div>
    <div class="themeModRangeControl">
        <input type="range" id="themeModDecoSize" class="themeModRange" min="70" max="150" step="5" value="100">
        <span id="themeModDecoSizeValue" class="themeModRangeValue">100%</span>
    </div>
</div>

<div class="themeModSetting themeModNoDivider themeModDecoOptionRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Also on the mod menu</div>
        <div class="themeModSettingDescription">Decorate this menu too, not just FlockMod's popups.</div>
    </div>
    ${toggle("themeModDecoMenu")}
</div>

<div class="themeModSetting themeModNoDivider themeModDecoOptionRow themeModDecoModeRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Decoration colors</div>
        <div class="themeModSettingDescription themeModDecoModeText">${DECO_COLOR_MODE_TEXT.theme}</div>
    </div>
    <div class="themeModDecoSeg" id="themeModDecoColorMode" role="radiogroup" aria-label="Decoration colors">
        <button type="button" role="radio" data-deco-mode="theme">Match my theme</button>
        <button type="button" role="radio" data-deco-mode="style">Style colors</button>
        <button type="button" role="radio" data-deco-mode="own">My own</button>
    </div>
</div>

<div class="themeModDecoColors">
    ${Object.keys(DECO_COLOR_DEFAULTS).map((key) => picker("deco-color", key, "", DECO_COLOR_DEFAULTS[key])).join("")}
</div>

<div class="themeModSetting themeModNoDivider themeModDecoOptionRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Title bar color</div>
        <div class="themeModSettingDescription">Color the popup title bars to match. OFF keeps your theme.</div>
    </div>
    ${toggle("themeModDecoFrame")}
</div>

<div class="themeModDecoSubColors themeModDecoTitleColors">
    ${picker("deco-frame-color", "title", "Title bar", DECO_FRAME_FALLBACK.title)}
    ${picker("deco-frame-color", "titleText", "Title text", DECO_FRAME_FALLBACK.titleText)}
</div>

<div class="themeModSetting themeModNoDivider themeModDecoOptionRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Border color</div>
        <div class="themeModSettingDescription">Color the popup border and resize edges. OFF keeps your theme.</div>
    </div>
    ${toggle("themeModDecoFrameBorder")}
</div>

<div class="themeModDecoSubColors themeModDecoBorderColors">
    ${picker("deco-frame-color", "border", "Border", DECO_FRAME_FALLBACK.border)}
</div>`;
    }

    function setupDecoControls(dialog) {
        const styleSelect = dialog.querySelector("#themeModDecoStyle");
        const placement = dialog.querySelector("#themeModDecoPlacement");
        const size = dialog.querySelector("#themeModDecoSize");
        const sizeValue = dialog.querySelector("#themeModDecoSizeValue");
        const menuToggle = dialog.querySelector("#themeModDecoMenu");
        const modeSeg = dialog.querySelector("#themeModDecoColorMode");
        const modeText = dialog.querySelector(".themeModDecoModeText");
        const colorsBox = dialog.querySelector(".themeModDecoColors");
        const previewDeco = dialog.querySelector(".themeModDecoPreview .fmDeco");
        const titleToggle = dialog.querySelector("#themeModDecoFrame");
        const borderToggle = dialog.querySelector("#themeModDecoFrameBorder");
        const titleBox = dialog.querySelector(".themeModDecoTitleColors");
        const borderBox = dialog.querySelector(".themeModDecoBorderColors");
        const pickers = {};
        const framePickers = {};
        let colorMode = "theme";
        /* true once you change a title bar / border color yourself */
        let frameCustom = false;

        if (!styleSelect) {
            return { save() {}, reset() {}, resetPreview() {} };
        }

        dialog.querySelectorAll("[data-deco-color]").forEach((input) => {
            pickers[input.dataset.decoColor] = input;
        });
        dialog.querySelectorAll("[data-deco-frame-color]").forEach((input) => {
            framePickers[input.dataset.decoFrameColor] = input;
        });

        /* Puts a style's own title bar / border colors into their pickers */
        function framePickersFromStyle(styleKey) {
            const f = (DECO_STYLES[styleKey] && DECO_STYLES[styleKey].frame) || DECO_FRAME_FALLBACK;
            frameCustom = false;
            Object.keys(framePickers).forEach((k) => { framePickers[k].value = f[k]; });
        }

        function setMode(mode) {
            colorMode = DECO_COLOR_MODES.includes(mode) ? mode : "theme";
            modeSeg.querySelectorAll("[data-deco-mode]").forEach((b) => {
                const on = b.dataset.decoMode === colorMode;
                b.classList.toggle("themeModDecoSegOn", on);
                b.setAttribute("aria-checked", String(on));
            });
            modeText.textContent = DECO_COLOR_MODE_TEXT[colorMode];
        }

        function fillPlacements(styleKey, wanted) {
            const allowed = DECO_STYLES[styleKey].placements;
            placement.innerHTML = allowed
                .map((p) => `<option value="${p}">${DECO_PLACEMENT_LABELS[p]}</option>`)
                .join("");
            placement.value = allowed.includes(wanted) ? wanted : (allowed[0] || "");
        }

        function readInputs() {
            const colors = {};
            Object.keys(pickers).forEach((k) => { colors[k] = pickers[k].value; });

            return normalizeDecoPlacement({
                style: styleSelect.value,
                placement: placement.value || "side",
                size: Number(size.value),
                colorMode,
                menu: menuToggle.checked,
                frame: titleToggle.checked,
                frameCustom,
                frameBorder: borderToggle.checked,
                frameColors: Object.fromEntries(Object.keys(framePickers).map((k) => [k, framePickers[k].value])),
                colors
            });
        }

        function updateRows(st) {
            const style = DECO_STYLES[st.style];
            const on = st.style !== "none";

            dialog.querySelectorAll(".themeModDecoOptionRow").forEach((row) => {
                row.style.display = on ? "" : "none";
            });

            placement.closest(".themeModSetting").style.display = on && style.placements.length ? "" : "none";
            colorsBox.style.display = on && st.colorMode === "own" ? "" : "none";
            titleBox.style.display = on && st.frame ? "" : "none";
            borderBox.style.display = on && st.frameBorder ? "" : "none";

            /* Styles without their own colors can't pick "Style colors" */
            const styleBtn = modeSeg.querySelector('[data-deco-mode="style"]');
            styleBtn.disabled = !style.palette;

            Object.keys(pickers).forEach((key) => {
                const label = style.colors[key];
                dialog.querySelector(`[data-deco-color-row="${key}"]`).style.display = label ? "" : "none";
                dialog.querySelector(`[data-deco-color-label="${key}"]`).textContent = label || "";
            });

            previewDeco.innerHTML = on ? buildDecoHTML(st) : "";
            previewDeco.closest(".themeModDecoPreviewWrap").style.display = on ? "" : "none";
        }

        function preview() {
            sizeValue.textContent = `${size.value}%`;
            const st = readInputs();
            updateRows(st);
            applyDeco(st);
        }

        function fill(st) {
            styleSelect.value = st.style;
            fillPlacements(st.style, st.placement);
            size.value = String(st.size);
            sizeValue.textContent = `${st.size}%`;
            setMode(st.colorMode);
            menuToggle.checked = st.menu;
            titleToggle.checked = Boolean(st.frame);
            borderToggle.checked = Boolean(st.frameBorder);
            framePickersFromStyle(st.style);
            if (st.frameCustom && st.frameColors) {
                frameCustom = true;
                Object.keys(framePickers).forEach((k) => {
                    if (st.frameColors[k]) framePickers[k].value = st.frameColors[k];
                });
            }
            Object.keys(pickers).forEach((k) => { pickers[k].value = st.colors[k]; });
            updateRows(st);
        }

        /* Switching to "My own" starts the pickers from the colors
           you're seeing right now, instead of random defaults */
        function seedPickers(fromMode) {
            if (fromMode === "style") {
                const palette = DECO_STYLES[styleSelect.value] && DECO_STYLES[styleSelect.value].palette;
                if (palette) {
                    Object.keys(pickers).forEach((k) => { if (palette[k]) pickers[k].value = palette[k]; });
                }
                return;
            }

            refreshThemeDecoColors();
            const cs = getComputedStyle(document.documentElement);
            const toHex = (c) => {
                const m = String(c).match(/\d+(\.\d+)?/g);
                if (/^#[0-9a-f]{6}$/i.test(c.trim())) return c.trim();
                return m && m.length >= 3 ? rgbToHex(m.slice(0, 3).map(Number)) : null;
            };
            const main = toHex(cs.getPropertyValue("--fmdeco-t-main"));
            const outline = toHex(cs.getPropertyValue("--fmdeco-t-outline"));
            const detail = toHex(cs.getPropertyValue("--fmdeco-t-detail"));

            if (main) pickers.main.value = main;
            if (outline) pickers.outline.value = outline;
            if (detail) {
                pickers.detail.value = detail;
                pickers.sparkle.value = mixHex(detail, "#ffffff", 0.45);
            }
        }

        fill(readSavedDeco());

        styleSelect.addEventListener("change", () => {
            fillPlacements(styleSelect.value, placement.value);
            framePickersFromStyle(styleSelect.value);   /* each style starts with its own title bar / border colors */
            if (colorMode === "style" && !DECO_STYLES[styleSelect.value].palette) {
                setMode("theme");
            }
            preview();
        });
        placement.addEventListener("change", preview);
        size.addEventListener("input", preview);
        menuToggle.addEventListener("change", preview);
        titleToggle.addEventListener("change", preview);
        borderToggle.addEventListener("change", preview);

        modeSeg.addEventListener("click", (event) => {
            const button = event.target.closest("[data-deco-mode]");

            if (!button || button.disabled || button.dataset.decoMode === colorMode) {
                return;
            }

            if (button.dataset.decoMode === "own") {
                seedPickers(colorMode);
            }

            setMode(button.dataset.decoMode);
            preview();
        });

        Object.values(pickers).forEach((input) => input.addEventListener("input", preview));
        Object.values(framePickers).forEach((input) => input.addEventListener("input", () => {
            frameCustom = true;
            preview();
        }));

        const defaults = () => ({
            style: "none", placement: "side", size: 100, colorMode: "theme", match: true, menu: false,
            frame: false, frameCustom: false, frameBorder: false, frameColors: {},
            colors: { ...DECO_COLOR_DEFAULTS }
        });

        return {
            save() {
                const st = readInputs();
                localStorage.setItem(DECO_LS.style, st.style);
                localStorage.setItem(DECO_LS.placement, st.placement);
                localStorage.setItem(DECO_LS.size, st.size);
                localStorage.setItem(DECO_LS.colorMode, st.colorMode);
                localStorage.setItem(DECO_LS.match, st.colorMode === "theme");   /* kept for older versions */
                localStorage.setItem(DECO_LS.menu, st.menu);
                localStorage.setItem(DECO_LS.frame, st.frame);
                localStorage.setItem(DECO_LS.frameCustom, st.frameCustom);
                localStorage.setItem(DECO_LS.frameBorder, st.frameBorder);
                DECO_FRAME_PICKERS.forEach(([k, ls]) => localStorage.setItem(DECO_LS[ls], st.frameColors[k]));
                Object.keys(DECO_COLOR_DEFAULTS).forEach((k) => localStorage.setItem(DECO_LS[k], st.colors[k]));
            },
            reset() {
                const st = defaults();
                fill(st);
                applyDeco(st);
                this.save();
            },
            /* Same as reset() but doesn't save: used by the
               Popup Decorations subsection's own reset button */
            resetPreview() {
                const st = defaults();
                fill(st);
                applyDeco(st);
            }
        };
    }


    /* =========================================================
       CHAT BUBBLES (Interface > Chat Bubbles)
       Restyles the public / staff chat (#chatMessages) on YOUR
       screen only. FlockMod marks your own messages with
       data-type="MYMSG", so no name guessing is needed.
       Looks are pure CSS (style.css). The only JS work is adding
       a small decoration (moth, horns, hearts...) to the first
       message of each of your message groups, done by a watcher
       that only looks at newly added messages.
       ========================================================= */

    const BUB_LS = {
        style: "flockmodBubbleStyle",
        right: "flockmodBubbleRight",
        others: "flockmodBubbleOthers",
        deco: "flockmodBubbleDeco",
        custom: "flockmodBubbleCustom",
        bg: "flockmodBubbleColor",
        text: "flockmodBubbleTextColor",
        border: "flockmodBubbleBorderColor"
    };

    const BUB_CUSTOM_DEFAULTS = { bg: "#f48fb1", text: "#3a1020", border: "#e0709a" };

    const bubButterfly = (w) => {
        const wing = '<path d="M20 15 C14 3 3 1 2 8 C1 15 11 17 20 16Z" class="fmbA"/>' +
                     '<path d="M20 17 C13 18 6 23 8 28 C11 32 18 25 20 17Z" class="fmbB"/>' +
                     '<circle cx="8" cy="8" r="2.2" class="fmbC"/><circle cx="12" cy="25" r="1.3" class="fmbC"/>';
        return `<svg viewBox="0 0 40 32" width="${w}"><g class="fmbWing">${wing}</g>` +
               `<g transform="translate(40 0) scale(-1 1)"><g class="fmbWing">${wing}</g></g>` +
               '<rect x="18.9" y="9" width="2.2" height="15" rx="1.1" class="fmbD"/>' +
               '<path d="M19.6 10 C18 5 16 4 14 3 M20.4 10 C22 5 24 4 26 3" class="fmbDs" stroke-width="1" fill="none" stroke-linecap="round"/></svg>';
    };
    const bubLeaf = (w, cls, rot) =>
        `<svg viewBox="0 0 24 14" width="${w}" style="transform: rotate(${rot}deg)"><path d="M1 7 C6 0 17 0 23 7 C17 14 6 14 1 7Z" class="${cls}"/><path d="M3 7 L20 7" stroke="#00000040" stroke-width=".9"/></svg>`;
    const bubHorn = (flip) =>
        `<svg viewBox="0 0 24 30" width="11"${flip ? ' style="transform: scaleX(-1)"' : ""}><path d="M3 30 C2 17 9 6 22 1 C15 9 12 18 15 30Z" class="fmbA"/><path d="M22 1 C18 5 16 8 14.5 12 C16.5 10 18.5 9 19.5 9 C20.5 6 21.5 3.5 22 1Z" class="fmbC"/></svg>`;
    const bubHeart = (w, cls) =>
        `<svg viewBox="0 0 20 18" width="${w}"><path d="M10 17 C4 12 1 9 1 6 C1 3 3 1 6 1 C8 1 9 2 10 4 C11 2 12 1 14 1 C17 1 19 3 19 6 C19 9 16 12 10 17Z" class="${cls}"/></svg>`;
    const bubAt = (css, html) => `<span class="fmBubPart" style="${css}">${html}</span>`;
    const bubStar = (w, cls, extra = "") => {
        let d = "";
        for (let i = 0; i < 10; i++) {
            const ang = -Math.PI / 2 + i * Math.PI / 5;
            const r = i % 2 ? 4.3 : 9.5;
            d += `${i ? "L" : "M"}${(10 + r * Math.cos(ang)).toFixed(1)} ${(10.5 + r * Math.sin(ang)).toFixed(1)}`;
        }
        return `<svg viewBox="0 0 20 20" width="${w}"><path d="${d}Z" class="${cls}" stroke-linejoin="round"${extra}/></svg>`;
    };
    const bubFlower = (w) => {
        let petals = "";
        for (let i = 0; i < 5; i++) {
            petals += `<path d="M0 0 C-5 -3 -5 -8.5 0 -9 C5 -8.5 5 -3 0 0Z" transform="rotate(${i * 72})" class="fmbA fmbBs" stroke-width=".9"/>`;
        }
        return `<svg viewBox="-10 -10 20 20" width="${w}"><g transform="rotate(12)">${petals}</g><circle r="2" class="fmbC"/></svg>`;
    };
    /* Classic set (matches the older popup decorations) */
    /* Same soft ear as the popups (v1.5 "Tidy") */
    const bubCatEar = (flip) => `<svg viewBox="-2 -2 44 36" width="21"${flip ? ' style="transform: scaleX(-1)"' : ""}><path d="M3 32 C5 21 11 10 16.5 5 Q20 1.5 23.5 5 C29 10 35 21 37 32Z" class="fmbA fmbBs" stroke-width="2" stroke-linejoin="round"/><path d="M11 31.5 C12.5 24 15.5 17 18.6 13.2 Q20 11.8 21.4 13.2 C24.5 17 27.5 24 29 31.5Z" class="fmbC"/></svg>`;
    const bubFoxEar = (flip) => `<svg viewBox="0 0 14 14" width="18"${flip ? ' style="transform: scaleX(-1)"' : ""}><path d="M1 14 L6 1.5 Q7 0 8 1.5 L13 14Z" class="fmbA fmbBs" stroke-width="1.2" stroke-linejoin="round"/><path d="M5.1 5.5 L6.3 2.3 Q7 1.3 7.7 2.3 L8.9 5.5Z" class="fmbB"/><path d="M4.6 13.4 L7 7.4 L9.4 13.4Z" class="fmbC"/></svg>`;
    const bubBearEar = '<svg viewBox="0 0 12 11" width="17"><circle cx="6" cy="6" r="5.2" class="fmbA fmbBs" stroke-width="1.2"/><circle cx="6" cy="6.6" r="2.5" class="fmbC"/></svg>';
    const bubPaw = '<svg viewBox="0 0 12 8" width="13"><ellipse cx="6" cy="4" rx="5.4" ry="3.6" class="fmbA fmbBs" stroke-width="1.1"/><circle cx="3.7" cy="3.4" r=".95" class="fmbC"/><circle cx="6" cy="2.7" r=".95" class="fmbC"/><circle cx="8.3" cy="3.4" r=".95" class="fmbC"/></svg>';
    const bubDogEar = (flip) => `<svg viewBox="0 0 10 20" width="10"${flip ? ' style="transform: scaleX(-1)"' : ""}><path d="M8 1 C3 0 0 5 1 12 C2 18 5 20 7 19 C9 18 9 12 9 7 C9 4 10 2 8 1Z" class="fmbA fmbBs" stroke-width="1"/></svg>`;

    /* Each style: colors (bg, text, border + a/b/c/d for the little
       decoration) and the decoration itself. Special looks (fonts,
       seeds, glow...) live in style.css under [data-fm-bub="key"]. */
    const BUB_STYLES = {
        none: { label: "Off (FlockMod's normal chat)", group: "" },
        simple: { label: "Simple", group: "Basic",
            c: { bg: "#f48fb1", text: "#3a1020", border: "#f48fb1" } },

        glitch: { label: "Glitch", group: "Dark",
            c: { bg: "#12121a", text: "#e6e6f0", border: "#2a2a3a", a: "#00e5ff", b: "#ff2bd6" },
            deco: bubAt("top: -9px; right: -9px", '<svg viewBox="0 0 22 22" width="15"><rect x="8" y="0" width="6" height="6" class="fmbB"/><rect x="14" y="6" width="6" height="6" class="fmbA"/><rect x="2" y="10" width="4" height="4" fill="#fff" opacity=".55"/></svg>') },
        /* v1.6: a little glowing luna moth */
        moth: { label: "Luna moth", group: "Neutral",
            c: { bg: "#1c2722", text: "#e3f5ea", border: "#5fd6a0", a: "#c9f5df", b: "#5fd6a0", c: "#a6e9c8", d: "#f4fff0" },
            deco: bubAt("top: -17px; right: -14px", `<svg viewBox="-2 -2 68 66" width="28" class="fmbLunaGlow" style="transform: rotate(14deg)">${lunaMothSVG(true)}</svg>`) },
        leaves: { label: "Leaves", group: "Neutral",
            c: { bg: "#2c4534", text: "#e3f1e6", border: "#4b6e55", a: "#7fb58c", b: "#4f8a5e" },
            /* v1.6: a little 3-leaf sprig on the corner, like the popups */
            deco: bubAt("top: -12px; left: -12px; width: 30px; height: 26px",
                      `<span style="position: absolute; left: 0; top: 6px">${bubLeaf(18, "fmbA", -160)}</span>` +
                      `<span style="position: absolute; left: 6px; top: 0">${bubLeaf(16, "fmbA", -110)}</span>` +
                      `<span style="position: absolute; left: 10px; top: 7px">${bubLeaf(14, "fmbB", -60)}</span>`) },
        strawberry: { label: "Strawberry", group: "Neutral",
            c: { bg: "#d8465a", text: "#ffffff", border: "#b33447", a: "#4f9e4a", b: "#2f6e30", c: "#ffe39a" },
            deco: bubAt("top: -11px; right: 12px", '<svg viewBox="0 0 44 22" width="30"><path d="M22 8 L15 2 L17 9 L6 7 L13 12 L3 16 L16 14 L22 21 L28 14 L41 16 L31 12 L38 7 L27 9 L29 2Z" class="fmbA fmbBs" stroke-width="1" stroke-linejoin="round"/><rect x="20.8" y="0" width="2.6" height="9" rx="1.3" class="fmbB"/></svg>') },
        dragon: { label: "Dragon", group: "Dark",
            c: { bg: "#2e1210", text: "#f5dccb", border: "#7a2b1c", a: "#8a3a26", b: "#d9532c", c: "#e2a57c" },
            deco: bubAt("top: -13px; left: 10px", bubHorn(false)) + bubAt("top: -13px; right: 10px", bubHorn(true)) +
                  bubAt("bottom: -14px; left: -24px", '<svg viewBox="0 0 64 40" width="34"><path d="M62 2 C44 4 34 28 14 29" class="fmbAs" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M15 29 L3 20 L7 31 L0 39 L16 34Z" class="fmbB"/></svg>') },
        gothic: { label: "Gothic lace", group: "Dark",
            c: { bg: "#2a1119", text: "#f1dfe5", border: "#6b1e33", a: "#9a8290", c: "#e05a78" },
            deco: bubAt("top: -12px; right: -6px", '<svg viewBox="0 0 60 26" width="30"><path d="M30 10 C24 2 12 2 2 8 C8 9 10 12 10 16 C14 13 18 14 20 18 C22 14 26 13 30 16 C34 13 38 14 40 18 C42 14 46 13 50 16 C50 12 52 9 58 8 C48 2 36 2 30 10Z" class="fmbA"/><path d="M26.5 9 L27 4 L29 8 L31 8 L33 4 L33.5 9 Q30 15 26.5 9Z" class="fmbA"/><circle cx="28.6" cy="9.3" r=".8" class="fmbC"/><circle cx="31.4" cy="9.3" r=".8" class="fmbC"/></svg>') },
        nightsky: { label: "Night sky", group: "Neutral",
            c: { bg: "#1c2a55", text: "#eef1fb", border: "#8a7a55", a: "#e8c97a" },
            deco: bubAt("top: -9px; right: -8px", '<svg viewBox="0 0 20 20" width="18"><path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8Z" class="fmbA fmbTwinkle"/></svg>') },
        terminal: { label: "Terminal", group: "Dark",
            c: { bg: "#0b120b", text: "#6dff9a", border: "#2f7a45" } },
        ink: { label: "Ink (sumi-e)", group: "Neutral",
            c: { bg: "#ece4d3", text: "#1a1917", border: "#1a1917", a: "#c23b2e", b: "#1a1917", c: "#f6efe2" },
            /* an ink blot on the corner + the red seal stamp */
            deco: bubAt("top: -9px; right: -9px", '<svg viewBox="0 0 24 22" width="22"><g class="fmbB">' +
                      '<path d="M11 3 C15 2 19 5 19 9 C20 13 17 17 12 17 C8 18 4 15 4 11 C3 7 7 3 11 3Z"/>' +
                      '<circle cx="21.5" cy="3.5" r="1.6"/><circle cx="22.5" cy="14" r="1"/><circle cx="3" cy="18.5" r="1.1"/></g></svg>') +
                  bubAt("bottom: -9px; left: -12px", '<svg viewBox="0 0 22 22" width="22"><circle cx="-1" cy="4" r="1.2" class="fmbB"/><circle cx="2" cy="1" r=".8" class="fmbB"/>' +
                      '<g transform="rotate(-6 8 13)"><rect x="0" y="5" width="16" height="16" rx="2" class="fmbA"/>' +
                      '<text x="8" y="17" text-anchor="middle" font-size="10.5" font-family="Yu Mincho, MS Mincho, Noto Serif CJK JP, serif" class="fmbC">印</text></g></svg>') },
        spiderweb: { label: "Spiderweb", group: "Dark",
            c: { bg: "#2c2c32", text: "#ececf0", border: "#4a4a54", a: "#9a9aa6" },
            deco: bubAt("top: -3px; left: -3px", '<svg viewBox="0 0 50 50" width="22" opacity=".85"><g class="fmbAs" stroke-width=".9" fill="none"><path d="M0 0 L50 10 M0 0 L40 30 M0 0 L25 45 M0 0 L8 50"/><path d="M15 3 Q12 5 12 9 Q9 10 7.5 13.5 Q4 13 2.4 15"/><path d="M30 6 Q23 10 24 18 Q17 20 15 27 Q8 27 4.8 30"/></g></svg>') },
        rose: { label: "Thorned rose", group: "Dark",
            c: { bg: "#321820", text: "#f6e1e6", border: "#7a2a3b", a: "#a8213b", b: "#3d6b3f", c: "#5e0f20" },
            /* v1.6: the same layered rose as the popups */
            deco: bubAt("top: -15px; left: -14px", `<svg viewBox="0 0 36 34" width="30">${roseHeadSVG(true)}</svg>`) },
        deepsea: { label: "Deep sea", group: "Neutral",
            c: { bg: "#0d2533", text: "#dff9f6", border: "#2a8f93", a: "#3fe0d0" },
            deco: bubAt("top: -18px; left: -10px", '<svg viewBox="0 0 16 40" width="9"><g class="fmbAs" fill="none" opacity=".75"><circle cx="8" cy="34" r="4"/><circle cx="4" cy="20" r="2.5"/><circle cx="10" cy="8" r="3"/></g></svg>') },
        minimal: { label: "Minimal", group: "Neutral",
            c: { bg: "#2a2c30", text: "#e8e9ec", border: "#3a3d43", a: "#8fa3bf" } },

        hearts: { label: "Hearts", group: "Cute",
            c: { bg: "#ffd6e0", text: "#6a2a3a", border: "#f48fb1", a: "#f48fb1", b: "#ff6f9a", c: "#ffb3c7" },
            deco: bubAt("top: -14px; right: -8px", `<span class="fmbFloat" style="display: flex; gap: 2px; align-items: flex-end">${bubHeart(10, "fmbA")}${bubHeart(15, "fmbB")}${bubHeart(8, "fmbC")}</span>`) },
        butterfly: { label: "Butterfly (pastel)", group: "Cute",
            c: { bg: "#efe3ff", text: "#4a3566", border: "#c7a8f0", a: "#ffb3d1", b: "#c7a8f0", c: "#ffffff", d: "#6b4f8a" },
            deco: bubAt("top: -15px; right: -12px", bubButterfly(28)) },
        ghost: { label: "Ghost", group: "Cute",
            c: { bg: "#f2f2f7", text: "#34343c", border: "#f2f2f7", a: "#ffffff", b: "#c9c9d4", c: "#34343c" },
            deco: bubAt("top: -9px; left: -8px", '<svg viewBox="0 0 20 22" width="18"><path d="M2 20 L2 10 A8 8 0 0 1 18 10 L18 20 L15 17 L12 20 L9 17 L6 20 L4 18Z" class="fmbA fmbBs" stroke-width="1"/><circle cx="7.5" cy="10" r="1.4" class="fmbC"/><circle cx="12.5" cy="10" r="1.4" class="fmbC"/></svg>') },
        bunny: { label: "Bunny", group: "Cute",
            c: { bg: "#fff0f3", text: "#6b3b48", border: "#f3c1cc", a: "#fff0f3", b: "#f3c1cc", c: "#ffc2d1" },
            /* v1.5: ears centered on any bubble + fluffy tail */
            deco: bubAt("top: -31px; left: calc(50% - 17px)", '<svg viewBox="-4 -2 66 62" width="34" style="overflow: visible"><g transform="rotate(-12 15 58)"><path d="M7 58 C2 44 0.5 26 3 14 C5 5 10 1 15 1 C20 1 25 5 27 14 C29.5 26 28 44 23 58Z" class="fmbA fmbBs" stroke-width="2" stroke-linejoin="round"/><path d="M10.5 56 C7.5 44 7 30 9 19 C10.5 12 13 8.5 15 8.5 C17 8.5 19.5 12 21 19 C23 30 22.5 44 19.5 56Z" class="fmbC"/></g><g transform="translate(58 0) scale(-1 1) rotate(-12 15 58)"><path d="M7 58 C2 44 0.5 26 3 14 C5 5 10 1 15 1 C20 1 25 5 27 14 C29.5 26 28 44 23 58Z" class="fmbA fmbBs" stroke-width="2" stroke-linejoin="round"/><path d="M10.5 56 C7.5 44 7 30 9 19 C10.5 12 13 8.5 15 8.5 C17 8.5 19.5 12 21 19 C23 30 22.5 44 19.5 56Z" class="fmbC"/></g></svg>') +
                  bubAt("bottom: -6px; right: -10px", '<svg viewBox="-1 -1 38 38" width="18"><g class="fmbB fmbBs" stroke-width="3.2"><circle cx="29.0" cy="21.4" r="5.8"/><circle cx="24.2" cy="27.7" r="5.8"/><circle cx="16.6" cy="29.4" r="5.8"/><circle cx="9.6" cy="25.8" r="5.8"/><circle cx="6.5" cy="18.6" r="5.8"/><circle cx="8.8" cy="11.0" r="5.8"/><circle cx="15.4" cy="6.8" r="5.8"/><circle cx="23.3" cy="7.8" r="5.8"/><circle cx="28.6" cy="13.5" r="5.8"/><circle cx="18" cy="18" r="11"/></g><g class="fmbA"><circle cx="29.0" cy="21.4" r="5.8"/><circle cx="24.2" cy="27.7" r="5.8"/><circle cx="16.6" cy="29.4" r="5.8"/><circle cx="9.6" cy="25.8" r="5.8"/><circle cx="6.5" cy="18.6" r="5.8"/><circle cx="8.8" cy="11.0" r="5.8"/><circle cx="15.4" cy="6.8" r="5.8"/><circle cx="23.3" cy="7.8" r="5.8"/><circle cx="28.6" cy="13.5" r="5.8"/><circle cx="18" cy="18" r="11"/></g></svg>') },
        cat: { label: "Cat", group: "Cute",
            c: { bg: "#f1e2d3", text: "#4a3326", border: "#c9a58c", a: "#f1e2d3", b: "#b98f74", c: "#f4a7b9" },
            /* ears at each end of the bubble; tail cream + outline like the popup tail */
            deco: bubAt("top: -14px; left: 5px", bubCatEar(false)) + bubAt("top: -14px; right: 7px", bubCatEar(true)) +
                  bubAt("bottom: 2px; right: -12px", '<svg viewBox="0 0 14 22" width="13" style="overflow: visible"><path d="M1 20 C10 20 12 13 8 9 C4 5 7 1 12 2" class="fmbBs" stroke-width="4.2" fill="none" stroke-linecap="round"/><path d="M1 20 C10 20 12 13 8 9 C4 5 7 1 12 2" class="fmbAs" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>') },
        dog: { label: "Dog", group: "Cute",
            c: { bg: "#f3e3cf", text: "#4a3322", border: "#c89b6d", a: "#a8764c", b: "#6e4b30" },
            deco: bubAt("top: -2px; left: -5px", bubDogEar(false)) + bubAt("top: -2px; right: -5px", bubDogEar(true)) },
        bear: { label: "Bear", group: "Cute",
            c: { bg: "#ead2b8", text: "#4a3020", border: "#9a6b4b", a: "#9a6b4b", b: "#6e4a32", c: "#f3dcc4" },
            /* v1.5: ears and paws at both ends, so they fit any bubble */
            deco: bubAt("top: -10px; left: 6px", bubBearEar) + bubAt("top: -10px; right: 6px", bubBearEar) +
                  bubAt("bottom: -6px; left: 10px", bubPaw) + bubAt("bottom: -6px; right: 10px", bubPaw) },
        fox: { label: "Fox", group: "Cute",
            c: { bg: "#e8894d", text: "#fffaf5", border: "#c2622b", a: "#e07a3c", b: "#5a2e14", c: "#fff1e6" },
            /* v1.5: bigger ears at both ends of the bubble */
            deco: bubAt("top: -16px; left: 5px", bubFoxEar(false)) + bubAt("top: -16px; right: 7px", bubFoxEar(true)) +
                  bubAt("bottom: 1px; right: -16px", '<svg viewBox="0 0 18 16" width="18"><path d="M0 12 C6 14 14 12 17 4 C13 6 9 6 6 5 C3 6 1 9 0 12Z" class="fmbA fmbBs" stroke-width="1"/><path d="M17 4 C14.5 5.5 13 6 11.5 6.3 C13 8 15 7 17 4Z" class="fmbC"/></svg>') },
        stars: { label: "Stars", group: "Cute",
            c: { bg: "#232a4d", text: "#fff3d0", border: "#c9a95a", a: "#ffe08a", b: "#fff3b8" },
            deco: bubAt("top: -10px; right: -9px", `<span class="fmbTwinkle" style="display: block">${bubStar(19, "fmbA")}</span>`) +
                  bubAt("top: -6px; right: 14px", bubStar(9, "fmbB")) + bubAt("bottom: -5px; left: -6px", bubStar(10, "fmbB")) },
        sakura: { label: "Sakura", group: "Cute",
            c: { bg: "#ffe3ee", text: "#6a2a45", border: "#f4a7c0", a: "#ffb7cf", b: "#e87fa3", c: "#ffe08a" },
            deco: bubAt("top: -11px; right: -10px", bubFlower(22)) +
                  bubAt("bottom: -7px; left: -6px", '<svg viewBox="-6 -12 12 13" width="9" style="transform: rotate(-30deg)"><path d="M0 0 C-5 -3 -5 -10 0 -12 C1 -10 -0.5 -9.5 0 -10 C0.5 -9.5 -1 -10 0 -12 C5 -10 5 -3 0 0Z" class="fmbA fmbBs" stroke-width=".9"/></svg>') },
        witch: { label: "Witch hat", group: "Cute",
            c: { bg: "#3a2a55", text: "#efe6ff", border: "#6b4f99", a: "#2a1d3f", b: "#9b6ad6", c: "#ffd86b" },
            deco: bubAt("top: -17px; left: 4px", '<svg viewBox="0 0 28 20" width="30"><g transform="rotate(-14 14 18)"><path d="M13 1 C17 3 19 8 21 15 L7 15 C9 10 10 5 13 1Z" class="fmbA fmbBs" stroke-width="1"/><path d="M13 1 C11 0 8 1 7 3" class="fmbBs" stroke-width="1.6" fill="none" stroke-linecap="round"/><rect x="8" y="12" width="12" height="2.6" rx=".8" class="fmbB"/><ellipse cx="14" cy="15.5" rx="11" ry="2.4" class="fmbA fmbBs" stroke-width="1"/></g></svg>') +
                  bubAt("top: -7px; right: -6px", `<span class="fmbTwinkle" style="display: block">${bubStar(12, "fmbC")}</span>`) },
        pixel: { label: "Pixel / 8-bit", group: "Cute",
            c: { bg: "#7c5cff", text: "#ffffff", border: "#7c5cff", a: "#5a3fd6" } },
        sticky: { label: "Sticky note", group: "Cute",
            c: { bg: "#fff3a8", text: "#3a3520", border: "#fff3a8" } },
        /* v1.6: wool puff on top, droopy ears on both ends, a tiny bell */
        lamb: { label: "Lamb", group: "Cute",
            c: { bg: "#fbf5ec", text: "#5b4a3e", border: "#e3d6c6", a: "#fffaf3", b: "#cdbba8", c: "#f2b9c3", d: "#e7bf62" },
            deco: bubAt("top: -19px; left: calc(50% - 18px)",
                      '<svg viewBox="0 0 36 20" width="36" style="overflow: visible"><g class="fmbA fmbBs" stroke-width="1.6"><circle cx="9" cy="13" r="7"/><circle cx="27" cy="13" r="7"/><circle cx="18" cy="9" r="8"/></g>' +
                      '<g class="fmbA"><circle cx="9" cy="13" r="5.8"/><circle cx="27" cy="13" r="5.8"/><circle cx="18" cy="9" r="6.8"/><rect x="8" y="13" width="20" height="7"/></g></svg>') +
                  bubAt("top: 3px; left: -21px", `<svg viewBox="0 0 46 46" width="23" style="overflow: visible; transform: scaleX(-1)">${lambEarSVG(true)}</svg>`) +
                  bubAt("top: 3px; right: -21px", `<svg viewBox="0 0 46 46" width="23" style="overflow: visible">${lambEarSVG(true)}</svg>`) +
                  bubAt("bottom: -17px; left: calc(50% - 9px)", `<svg viewBox="0 0 32 28" width="18" style="overflow: visible">${lambBellSVG(true)}</svg>`) },
        /* v1.6: a latte on the bubble's corner and a little cookie */
        cafe: { label: "Cozy café", group: "Cute",
            c: { bg: "#f6ebdf", text: "#5a3d2b", border: "#d7bfa6", a: "#f4e7d7", b: "#6b4a35", c: "#b9825a", d: "#ffffff" },
            deco: bubAt("top: -24px; left: 2px", `<svg viewBox="0 0 50 50" width="26" style="overflow: visible">${cafeMugSVG(true)}</svg>`) +
                  bubAt("bottom: -8px; left: -8px", `<svg viewBox="0 0 26 26" width="15">${cafeCookieSVG(true)}</svg>`) },
        /* v1.6: a glowing moon on the corner + a mint star and pink sparkle */
        celestial: { label: "Celestial", group: "Neutral",
            c: { bg: "#1e2448", text: "#ece8ff", border: "#5f58a8", a: "#f6e3a1", b: "#cbc5f3", c: "#9ef0d6", d: "#f3a6cf" },
            deco: bubAt("top: -12px; right: -10px", `<svg viewBox="0 0 56 76" width="20" class="fmbMoonGlow" style="overflow: visible">${celMoonSVG(true)}</svg>`) +
                  bubAt("bottom: -6px; left: -8px", `<svg viewBox="0 0 18 14" width="14" class="fmbSoftGlow" style="overflow: visible">${celStar(5, 8, 5, "fmbC")}${celPlus(14, 3, 2.5, "fmbDs")}</svg>`) },
        /* v1.6: a grin ball on each end of the bubble */
        grinball: { label: "Grin ball", group: "Cute",
            c: { bg: "#6e4339", text: "#fbeee0", border: "#c99a3a", a: "#1f1d22", b: "#0b0b0c", c: "#ffffff", d: "#5f8f3a" },
            deco: bubAt("top: calc(50% - 12px); left: -22px", `<svg viewBox="-2 -2 44 44" width="24" class="fmbGrinRim">${grinBallSVG(true)}</svg>`) +
                  bubAt("top: calc(50% - 12px); right: -22px", `<svg viewBox="-2 -2 44 44" width="24" class="fmbGrinRim">${grinBallSVG(true)}</svg>`) +
                  bubAt("bottom: -17px; left: calc(50% - 11px)", `<svg viewBox="0 0 44 38" width="22" class="fmbGrinRim">${grinTieSVG(true)}</svg>`) }
,
        /* v1.6: a hibiscus on the corner */
        shoreline: { label: "Shoreline", group: "Neutral",
            c: { bg: "#2c2450", text: "#f4efff", border: "#9a8fd0", a: "#ffd76a", b: "#d9844a", c: "#f06a8a", d: "#fff6d8" },
            deco: bubAt("top: -12px; right: -12px", `<svg viewBox="0 0 40 40" width="24" class="fmbShoreGlow">${shoreHibiscusSVG(true)}</svg>`) },
        /* v1.6: a shark fin cutting along the top */
        sharks: { label: "Sharks", group: "Neutral",
            c: { bg: "#124b5e", text: "#e6fbfc", border: "#3d9db2", a: "#5d8ea6", b: "#4fc3ff" },
            deco: bubAt("top: -11px; left: 22px", '<svg viewBox="0 0 30 14" width="24" class="fmbSharkGlow"><path d="M2 13 C8 13 12 9 15 1 C17 7 20 11 28 13Z" class="fmbA"/><path d="M0 13.3 L30 13.3" class="fmbBs" stroke-width="1.2" stroke-linecap="round" opacity=".7"/></svg>') },
        /* v1.6.2: gradient bubble with clovers, a heart and a sparkle */
        lucky: { label: "Lucky days", group: "Cute",
            c: { bg: "#4fd1bd", text: "#ffffff", border: "#3f8a4c", a: "#a6ec74", b: "#3f9a52", c: "#ffb0cf", d: "#c9a8ff" },
            deco: bubAt("top: -13px; right: -12px", `<svg viewBox="0 0 40 40" width="24">${luckyCloverSVG(true)}</svg>`) +
                  bubAt("bottom: -8px; left: -9px", `<svg viewBox="0 0 40 40" width="16">${luckyCloverSVG(true)}</svg>`) +
                  bubAt("bottom: -6px; right: 16px", `<svg viewBox="0 0 24 22" width="12">${luckyHeartSVG(true)}</svg>`) +
                  bubAt("top: -8px; left: 10px", '<svg viewBox="-5 -5 10 10" width="8" class="fmbTwinkle"><path d="M0 -4 L0 4 M-4 0 L4 0" transform="rotate(45)" class="fmbDs" stroke-width="2" stroke-linecap="round"/></svg>') },
        /* v1.6.2: lace edges top and bottom, a little skull bow */
        maid: { label: "Dark maid", group: "Dark",
            c: { bg: "#21162b", text: "#f1e9ff", border: "#5b3f86", a: "#e8def4", b: "#3d2163", c: "#ffcf6b" },
            deco: bubAt("top: -5px; left: 7px; right: 7px; height: 5px", '<i class="fmbMaidLace"></i>') +
                  bubAt("bottom: -5px; left: 7px; right: 7px; height: 5px", '<i class="fmbMaidLace fmbMaidLaceB"></i>') +
                  bubAt("top: -13px; left: -10px", `<svg viewBox="0 0 54 44" width="26">${maidBowSVG(true)}</svg>`) }
    };

    const BUB_STYLE_CHOICES = Object.keys(BUB_STYLES);
    const BUB_ROLE_KEYS = ["bg", "text", "border", "a", "b", "c", "d"];

    function readSavedBubbles() {
        const style = localStorage.getItem(BUB_LS.style);
        const colors = {};

        Object.keys(BUB_CUSTOM_DEFAULTS).forEach((k) => {
            const v = localStorage.getItem(BUB_LS[k]);
            colors[k] = /^#[0-9a-f]{6}$/i.test(v || "") ? v : BUB_CUSTOM_DEFAULTS[k];
        });

        return {
            style: BUB_STYLES[style] ? style : "none",
            right: localStorage.getItem(BUB_LS.right) !== "false",    /* default ON */
            others: localStorage.getItem(BUB_LS.others) !== "false",  /* default ON */
            deco: localStorage.getItem(BUB_LS.deco) !== "false",      /* default ON */
            custom: localStorage.getItem(BUB_LS.custom) === "true",
            colors
        };
    }

    let liveBubbles = null;

    function applySavedBubbles() {
        applyBubbles(readSavedBubbles());
    }

    function applyBubbles(st) {
        liveBubbles = st;
        const root = document.documentElement;
        const style = BUB_STYLES[st.style] || BUB_STYLES.none;
        const on = st.style !== "none";

        root.classList.toggle("fmBubOn", on);
        root.classList.toggle("fmBubRight", on && st.right);
        root.classList.toggle("fmBubOthers", on && st.others);

        if (on) {
            root.dataset.fmBub = st.style;
            const c = bubbleColors(st);

            BUB_ROLE_KEYS.forEach((k) => {
                root.style.setProperty(`--fmbub-${k}`, c[k]);
            });
        } else {
            delete root.dataset.fmBub;
        }

        redecorateAllBubbles();
    }

    /* The style's colors (or your custom bubble colors), every role filled */
    function bubbleColors(st) {
        const style = BUB_STYLES[st.style] || BUB_STYLES.none;
        const c = { ...(style.c || {}) };

        if (st.custom) {
            c.bg = st.colors.bg;
            c.text = st.colors.text;
            c.border = st.colors.border;
        }

        const out = {};
        BUB_ROLE_KEYS.forEach((k) => { out[k] = c[k] || c.border || c.bg; });
        return out;
    }

    /* The little preview in the menu styles itself (its own classes,
       colors and decorations), so it always shows the style you
       picked, even while bubbles aren't on in the real chat */
    function paintBubblePreview(dialog, st) {
        const box = dialog.querySelector(".themeModBubblePreview:not(.fmThumbChat)");

        if (!box) {
            return;
        }

        const style = BUB_STYLES[st.style] || BUB_STYLES.none;
        const on = st.style !== "none";

        box.classList.toggle("fmPrevOn", on);
        box.classList.toggle("fmBubRight", on && st.right);
        box.classList.toggle("fmBubOthers", on && st.others);

        if (on) {
            box.dataset.fmBub = st.style;
            const c = bubbleColors(st);
            BUB_ROLE_KEYS.forEach((k) => box.style.setProperty(`--fmbub-${k}`, c[k]));
        } else {
            delete box.dataset.fmBub;
        }

        const sig = on && st.deco && style.deco ? st.style : "";
        box.querySelectorAll(MY_BLOCKS).forEach((block) => decorateBubbleBlock(block, sig));
    }

    /* ---- decorations on your messages ---- */

    function bubbleDecoSig() {
        const st = liveBubbles;
        return st && st.style !== "none" && st.deco && customizationsEnabled && BUB_STYLES[st.style].deco
            ? st.style
            : "";
    }

    function decorateBubbleBlock(block, sig) {
        decorateBubbleText(block.querySelector(".msgLine .msgText"), sig);
    }

    /* Adds (or swaps / removes) the decoration on one bubble: a chat
       .msgText or one of your Chat Notification cards */
    function decorateBubbleText(text, sig) {
        if (!text) {
            return;
        }

        const old = text.querySelector(":scope > .fmBubDeco");

        if (old && old.dataset.sig === sig) {
            return;
        }

        if (old) {
            old.remove();
        }

        text.classList.toggle("fmBubHasDeco", Boolean(sig));

        if (!sig) {
            return;
        }

        const deco = document.createElement("span");
        deco.className = "fmBubDeco";
        deco.dataset.sig = sig;
        deco.setAttribute("aria-hidden", "true");
        deco.innerHTML = BUB_STYLES[sig].deco;
        text.appendChild(deco);
    }

    const MY_BLOCKS = '.chatBlock.messageBlock[data-type="MYMSG"]';
    const CN_OWN_BUBBLE = ".fmCnStack .fmCnCard.fmCnOwn";

    function redecorateAllBubbles() {
        const sig = bubbleDecoSig();

        document.querySelectorAll(`#chatMessages ${MY_BLOCKS}`)
            .forEach((block) => decorateBubbleBlock(block, sig));

        /* Your Chat Notification cards wear it too */
        document.querySelectorAll(CN_OWN_BUBBLE)
            .forEach((line) => decorateBubbleText(line, sig));

        /* Leftovers (e.g. after turning decorations off). The menu
           preview handles its own (paintBubblePreview). */
        if (!sig) {
            document.querySelectorAll("#chatMessages .fmBubDeco, .fmCnStack .fmBubDeco").forEach((el) => el.remove());
            document.querySelectorAll("#chatMessages .fmBubHasDeco, .fmCnStack .fmBubHasDeco").forEach((el) => el.classList.remove("fmBubHasDeco"));
        }
    }

    /* Watches the chat box for new messages. Re-attached from the
       500ms loop when FlockMod creates or replaces #chatMessages. */
    const bubbleWatch = { el: null, observer: null };

    function watchBubbleChat() {
        const el = document.getElementById("chatMessages");

        if (el === bubbleWatch.el) {
            return;
        }

        if (bubbleWatch.observer) {
            bubbleWatch.observer.disconnect();
        }

        bubbleWatch.el = el;
        bubbleWatch.observer = null;

        if (!el) {
            return;
        }

        bubbleWatch.observer = new MutationObserver((records) => {
            const sig = bubbleDecoSig();

            if (!sig) {
                return;
            }

            records.forEach((record) => record.addedNodes.forEach((node) => {
                if (node.nodeType !== 1 || node.classList.contains("fmBubDeco") || node.closest(".fmBubDeco")) {
                    return;
                }

                const block = node.closest(MY_BLOCKS);

                if (block) {
                    decorateBubbleBlock(block, sig);
                } else {
                    node.querySelectorAll(MY_BLOCKS).forEach((b) => decorateBubbleBlock(b, sig));
                }
            }));
        });

        bubbleWatch.observer.observe(el, { childList: true, subtree: true });
        redecorateAllBubbles();
    }

    /* ---- menu (Interface panel) ---- */

    function buildBubbleRowsHTML() {
        const toggle = (id, def) => `
            <label class="themeModToggle">
                <input type="checkbox" id="${id}" data-default="${def}"${def ? " checked" : ""}>
                <span class="themeModToggleTrack">
                    <span class="themeModToggleOption themeModToggleOff">OFF</span>
                    <span class="themeModToggleOption themeModToggleOn">ON</span>
                    <span class="themeModToggleThumb"></span>
                </span>
            </label>`;

        const groups = {};
        BUB_STYLE_CHOICES.forEach((k) => {
            const g = BUB_STYLES[k].group;
            (groups[g] = groups[g] || []).push(k);
        });

        const options = Object.entries(groups).map(([g, keys]) => {
            const opts = keys.map((k) => `<option value="${k}"${k === "none" ? " selected" : ""}>${BUB_STYLES[k].label}</option>`).join("");
            return g ? `<optgroup label="${g}">${opts}</optgroup>` : opts;
        }).join("");

        const msg = (mine, name, lines) =>
            `<div class="chatBlock messageBlock" data-type="${mine ? "MYMSG" : "MSG"}">` +
            `<div class="msgTime">13:27</div><div class="msgUsername">${name}</div><div class="msgContent">` +
            lines.map((t) => `<div class="msgLine"><div class="msgTime"></div><div class="msgText">${t}</div></div>`).join("") +
            "</div></div>";

        return `
<div class="themeModSubsectionTitle themeModSpacingSubsection">
    Chat Bubbles
</div>

<div class="themeModSetting themeModNoDivider fmStyleRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Bubble style</div>
        <div class="themeModSettingDescription">
            Chat in bubbles, yours in a special style. Only you see it.
        </div>
    </div>
    <select id="themeModBubbleStyle" class="themeModSelect fmStyleHiddenSelect" data-default="none" tabindex="-1" aria-hidden="true">${options}</select>
</div>

<div class="themeModSetting themeModNoDivider">
    <div class="themeModSettingText">
        <div class="themeModSettingName"><i class="fas fa-link"></i> Match popups and bubbles</div>
        <div class="themeModSettingDescription">Picking a style in one picks it in the other too.</div>
    </div>
    ${toggle("themeModStyleMatch", true)}
</div>

<div class="themeModBubblePreviewWrap themeModBubbleOptionRow">
    <div class="themeModBubblePreview">
        ${msg(false, '<i class="fas fa-star themeModBubbleAnonStar"></i>Anonymous', ["hi nene!!! can we rp? match me with cat ears :3"])}
        ${msg(true, "nene2nd", ["heyy anon!", "yes let's match"])}
        ${msg(false, '<i class="fas fa-star themeModBubbleAnonStar"></i>Anonymous', ["yay!"])}
        ${msg(true, "nene2nd", ["what colors should we pick? :3"])}
    </div>
</div>

<div class="themeModSetting themeModNoDivider themeModBubbleOptionRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">My messages on the right</div>
        <div class="themeModSettingDescription">Like a phone chat: yours on the right, everyone else on the left.</div>
    </div>
    ${toggle("themeModBubbleRight", true)}
</div>

<div class="themeModSetting themeModNoDivider themeModBubbleOptionRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Bubble everyone else</div>
        <div class="themeModSettingDescription">Plain bubbles for everyone else's messages.</div>
    </div>
    ${toggle("themeModBubbleOthers", true)}
</div>

<div class="themeModSetting themeModNoDivider themeModBubbleOptionRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Bubble decorations</div>
        <div class="themeModSettingDescription">Little extras like moths, horns or hearts on your messages.</div>
    </div>
    ${toggle("themeModBubbleDeco", true)}
</div>

<div class="themeModSetting themeModNoDivider themeModBubbleOptionRow">
    <div class="themeModSettingText">
        <div class="themeModSettingName">Custom bubble colors</div>
        <div class="themeModSettingDescription">Pick your own bubble, text and border colors.</div>
    </div>
    ${toggle("themeModBubbleCustom", false)}
</div>

<div class="themeModBubbleColors">
    ${[["bg", "Bubble"], ["text", "Text"], ["border", "Border"]].map(([k, label]) => `
    <div class="themeModSetting themeModNoDivider themeModDecoColorRow">
        <div class="themeModSettingText"><div class="themeModSettingName">${label}</div></div>
        <input type="color" data-bubble-color="${k}" value="${BUB_CUSTOM_DEFAULTS[k]}" data-default="${BUB_CUSTOM_DEFAULTS[k]}">
    </div>`).join("")}
</div>`;
    }

    function setupBubbleControls(dialog) {
        const styleSelect = dialog.querySelector("#themeModBubbleStyle");

        if (!styleSelect) {
            return { save() {}, reset() {} };
        }

        const right = dialog.querySelector("#themeModBubbleRight");
        const others = dialog.querySelector("#themeModBubbleOthers");
        const deco = dialog.querySelector("#themeModBubbleDeco");
        const custom = dialog.querySelector("#themeModBubbleCustom");
        const colorsBox = dialog.querySelector(".themeModBubbleColors");
        const pickers = {};

        dialog.querySelectorAll("[data-bubble-color]").forEach((input) => {
            pickers[input.dataset.bubbleColor] = input;
        });

        function readInputs() {
            const colors = {};
            Object.keys(pickers).forEach((k) => { colors[k] = pickers[k].value; });

            return {
                style: styleSelect.value,
                right: right.checked,
                others: others.checked,
                deco: deco.checked,
                custom: custom.checked,
                colors
            };
        }

        function updateRows(st) {
            const on = st.style !== "none";

            dialog.querySelectorAll(".themeModBubbleOptionRow").forEach((row) => {
                row.style.display = on ? "" : "none";
            });
            colorsBox.style.display = on && st.custom ? "" : "none";
            deco.closest(".themeModSetting").style.display = on && BUB_STYLES[st.style].deco ? "" : "none";
        }

        function preview() {
            const st = readInputs();
            updateRows(st);
            applyBubbles(st);
            paintBubblePreview(dialog, st);
        }

        function fill(st) {
            styleSelect.value = st.style;
            right.checked = st.right;
            others.checked = st.others;
            deco.checked = st.deco;
            custom.checked = st.custom;
            Object.keys(pickers).forEach((k) => { pickers[k].value = st.colors[k]; });
            updateRows(st);
            paintBubblePreview(dialog, st);
        }

        fill(readSavedBubbles());

        styleSelect.addEventListener("change", preview);
        [right, others, deco].forEach((el) => el.addEventListener("change", preview));
        Object.values(pickers).forEach((input) => input.addEventListener("input", preview));

        /* Turning custom colors on starts from the style's own colors */
        custom.addEventListener("change", () => {
            const style = BUB_STYLES[styleSelect.value];

            if (custom.checked && style && style.c) {
                Object.keys(pickers).forEach((k) => {
                    if (style.c[k]) {
                        pickers[k].value = style.c[k];
                    }
                });
            }
            preview();
        });

        return {
            save() {
                const st = readInputs();
                localStorage.setItem(BUB_LS.style, st.style);
                localStorage.setItem(BUB_LS.right, st.right);
                localStorage.setItem(BUB_LS.others, st.others);
                localStorage.setItem(BUB_LS.deco, st.deco);
                localStorage.setItem(BUB_LS.custom, st.custom);
                Object.keys(BUB_CUSTOM_DEFAULTS).forEach((k) => localStorage.setItem(BUB_LS[k], st.colors[k]));
            },
            reset() {
                const st = {
                    style: "none", right: true, others: true, deco: true, custom: false,
                    colors: { ...BUB_CUSTOM_DEFAULTS }
                };
                fill(st);
                applyBubbles(st);
                this.save();
            }
        };
    }


    /* =========================================================
       SAFETY: TROLL DETECTION (Safety tab)
       Purely local. Only READS what FlockMod already shows you:
       - user list: who is a guest (".rankUU") and the icon of the
         tool each person is holding
       - board cursors: each person's brush circle (its width is
         their brush size in board pixels) and how it moves
       Flags only change how names look on YOUR screen, plus an
       optional small popup/sound. Nothing is sent anywhere and
       nobody else sees any of it. It can only warn: it never
       stops, undoes or kicks anyone.
       ========================================================= */

    const TROLL_LS = {
        enabled: "flockmodTrollEnabled",
        flagAfter: "flockmodTrollFlagAfter",     /* tenths of a second */
        bigBrushPx: "flockmodTrollBigBrushPx",
        stay: "flockmodTrollStay",               /* seconds, 0 = until they leave */
        guestsOnly: "flockmodTrollGuestsOnly",
        eraser: "flockmodTrollWatchEraser",
        fill: "flockmodTrollWatchFill",
        selection: "flockmodTrollWatchSelection",
        bigBrush: "flockmodTrollWatchBigBrush",
        scribble: "flockmodTrollWatchScribble",
        popup: "flockmodTrollPopup",
        color: "flockmodTrollColor",
        /* v1.4 */
        sensitivity: "flockmodTrollSensitivity", /* relaxed | normal | strict */
        bigText: "flockmodTrollWatchBigText",
        bigTextPx: "flockmodTrollBigTextPx",
        /* v1.6.2 */
        popupEvery: "flockmodTrollPopupEvery",    /* seconds between warnings for the same person */
        warnAgain: "flockmodTrollWarnAgain"       /* keep warning while someone already flagged keeps trolling */
    };

    const TROLL_DEFAULTS = {
        enabled: false,
        flagAfter: 15,
        bigBrushPx: 140,
        stay: 60,
        guestsOnly: true,
        eraser: true,
        fill: true,
        selection: true,
        bigBrush: true,
        scribble: true,
        popup: true,
        color: "#ff3b3b",
        sensitivity: "normal",
        bigText: true,
        bigTextPx: 100,
        popupEvery: 60,
        warnAgain: true
    };

    /* Sensitivity = how much of the board (in the last 10 seconds)
       someone has to cover with scribbles, the eraser or fill */
    const TROLL_SENSITIVITY = {
        relaxed: { label: "Relaxed", cover: 0.45 },
        normal: { label: "Normal", cover: 0.30 },
        strict: { label: "Strict", cover: 0.18 }
    };

    /* Board coverage: the board is split into a grid; every square
       someone's brush/eraser passes over is remembered for 10s */
    const TROLL_COVER = { cols: 32, rows: 18, windowMs: 10000, slowMs: 60000, maxJump: 260 };

    /* v1.6: rooms come in many board sizes (640x360 up to 1920x2160 and
       more). Every size limit above was tuned on a 1280x720 board, so
       they're scaled by the board's size: k = 0.5 on a 640x360 board,
       about 2.1 on 1920x2160. The coverage grid keeps ~576 roughly
       square cells whatever the board's shape. */
    const TROLL_BASE_AREA = 1280 * 720;
    let trollGrid = { w: 0, h: 0, cols: 32, rows: 18, k: 1 };

    function trollBoard() {
        const { w, h } = trollBoardSize();
        if (w !== trollGrid.w || h !== trollGrid.h) {
            const cols = Math.max(8, Math.min(48, Math.round(Math.sqrt(576 * w / h))));
            const rows = Math.max(8, Math.min(48, Math.round(576 / cols)));
            const k = Math.min(3, Math.max(0.4, Math.sqrt((w * h) / TROLL_BASE_AREA)));
            trollGrid = { w, h, cols, rows, k };
            trollCoverage.clear(); /* old squares don't match the new grid */
        }
        return trollGrid;
    }

    /* v1.6.2: how often the same person can set off a warning (1 minute at most) */
    const TROLL_POPUP_EVERY_CHOICES = [
        [5, "5 seconds"], [10, "10 seconds"], [15, "15 seconds"], [30, "30 seconds"], [60, "1 minute"]
    ];

    const TROLL_STAY_CHOICES = [
        [15, "15 seconds"], [30, "30 seconds"], [60, "1 minute"],
        [120, "2 minutes"], [300, "5 minutes"], [0, "Until they leave"]
    ];

    /* Movement patterns (board pixels; the board is usually 1280 wide) */
    const TROLL_SWEEP = { windowMs: 1500, span: 450 };

    /* Which user-list tool icons count as which risky tool */
    const TROLL_TOOL_ICONS = {
        eraser: ["fa-eraser"],
        fill: ["fa-fill-drip", "fa-fill", "fa-paint-roller", "fa-bucket"],
        selection: ["fa-draw-polygon", "fa-vector-square", "fa-object-group", "fa-mouse-pointer",
                    "fa-arrow-pointer", "fa-arrows-alt", "fa-up-down-left-right", "fa-expand-arrows-alt",
                    "fa-crop", "fa-crop-alt", "fa-crop-simple"]
    };

    const TROLL_TOOL_NAMES = { eraser: "Eraser", fill: "Fill tool", selection: "Selection/move" };

    function readSavedTroll() {
        const st = { ...TROLL_DEFAULTS };

        Object.keys(TROLL_DEFAULTS).forEach((key) => {
            const raw = localStorage.getItem(TROLL_LS[key]);

            if (raw === null) {
                return;
            }

            const def = TROLL_DEFAULTS[key];

            if (typeof def === "boolean") {
                st[key] = raw === "true";
            } else if (typeof def === "number") {
                const n = Number(raw);
                if (Number.isFinite(n)) st[key] = n;
            } else if (key === "sensitivity") {
                if (TROLL_SENSITIVITY[raw]) st[key] = raw;
            } else if (/^#[0-9a-f]{6}$/i.test(raw)) {
                st[key] = raw;
            }
        });

        st.flagAfter = Math.min(80, Math.max(5, Math.round(st.flagAfter)));
        /* 140 is FlockMod's biggest brush/text size */
        st.bigBrushPx = Math.min(140, Math.max(40, Math.round(st.bigBrushPx)));
        st.bigTextPx = Math.min(140, Math.max(30, Math.round(st.bigTextPx)));
        st.stay = TROLL_STAY_CHOICES.some(([v]) => v === st.stay) ? st.stay : TROLL_DEFAULTS.stay;
        st.popupEvery = TROLL_POPUP_EVERY_CHOICES.some(([v]) => v === st.popupEvery) ? st.popupEvery : TROLL_DEFAULTS.popupEvery;
        return st;
    }

    let liveTroll = null;

    function applyTroll(st) {
        liveTroll = st;
        document.documentElement.style.setProperty("--fm-troll-color", st.color);

        /* a new highlight color reaches name tags right away */
        document.querySelectorAll(".CursorContainer .cursor.fmTrollFlag").forEach((el) => {
            const label = el.querySelector(".pointerLabel");
            if (label) delete label.dataset.fmTroll;
            paintTrollCursor(el, true);
        });

        if (!st.enabled) {
            clearAllTrollFlags();
        }

        watchTrollCursors();
    }

    function applySavedTroll() {
        applyTroll(readSavedTroll());
    }

    /* ---------- reading the page ---------- */

    function trollNameFromCell(td) {
        return [...td.childNodes]
            .filter((n) => n.nodeType === 3)
            .map((n) => n.textContent)
            .join("")
            .trim();
    }

    function readUserRows() {
        const users = new Map();

        document.querySelectorAll("#sidebar tr.someoneelse").forEach((row) => {
            const cell = row.querySelector('td[class*="rank"]');
            const name = cell ? trollNameFromCell(cell) : "";

            if (!name) {
                return;
            }

            const icon = row.querySelector(".brushIcon i, .userlistIcon:not(.colorbox) i");
            let tool = null;

            if (icon) {
                const classes = ` ${icon.className} `;
                tool = Object.keys(TROLL_TOOL_ICONS).find((key) =>
                    TROLL_TOOL_ICONS[key].some((c) => classes.includes(` ${c} `))
                ) || null;
            }

            users.set(name, { row, cell, guest: cell.classList.contains("rankUU"), tool });
        });

        return users;
    }

    function readCursors() {
        const cursors = new Map();

        document.querySelectorAll(".CursorContainer .cursor:not(.myself)").forEach((el) => {
            const label = el.querySelector(".pointerLabel");
            const name = label ? label.textContent.trim() : "";

            if (!name || el.style.display === "none") {
                return;
            }

            const circle = el.querySelector(".pointer");
            /* With the text tool, FlockMod adds a .textfield showing
               the person's real text size */
            const text = el.querySelector(".textfield");
            const textPx = text && text.style.display !== "none" ? parseFloat(text.style.fontSize) || 0 : 0;
            cursors.set(name, { el, size: circle ? parseFloat(circle.style.width) || 0 : 0, textPx });
        });

        return cursors;
    }

    /* ---------- movement history ----------
       FlockMod moves each person's cursor by changing its style.
       A watcher on the cursor box records every position (last 3s
       only), so fast scribbles and big sweeps can be measured. */

    const trollHistory = new Map();   /* name -> [{t, x, y}] */
    const trollCoverage = new Map();  /* name -> Map(cell index -> last time) */
    const trollWatched = new Set();   /* names being watched right now (guests only, if that's on) */
    let trollCursorWatch = { el: null, observer: null };

    function trollBoardSize() {
        const board = document.querySelector(".boardContainer");
        const w = board ? parseFloat(board.style.width) : 0;
        const h = board ? parseFloat(board.style.height) : 0;
        return { w: w > 0 ? w : 1280, h: h > 0 ? h : 720 };
    }

    /* Marks the grid squares a brush of this size passes over
       between two points (a big jump = pen lifted: only the end) */
    function trollStamp(name, from, to, sizePx, now) {
        const { w, h, cols, rows, k } = trollBoard();
        const cw = w / cols;
        const ch = h / rows;
        const r = Math.max(4, sizePx / 2);
        let cells = trollCoverage.get(name);

        if (!cells) {
            cells = new Map();
            trollCoverage.set(name, cells);
        }

        const mark = (x, y) => {
            const c0 = Math.max(0, Math.floor((x - r) / cw));
            const c1 = Math.min(cols - 1, Math.floor((x + r) / cw));
            const r0 = Math.max(0, Math.floor((y - r) / ch));
            const r1 = Math.min(rows - 1, Math.floor((y + r) / ch));

            for (let row = r0; row <= r1; row++) {
                for (let col = c0; col <= c1; col++) {
                    cells.set(row * cols + col, now);
                }
            }
        };

        const dist = from ? Math.hypot(to.x - from.x, to.y - from.y) : 0;

        if (!from || dist > TROLL_COVER.maxJump * k) {
            mark(to.x, to.y);
            return;
        }

        const steps = Math.max(1, Math.ceil(dist / (Math.min(cw, ch) / 2)));

        for (let i = 1; i <= steps; i++) {
            mark(from.x + (to.x - from.x) * i / steps, from.y + (to.y - from.y) * i / steps);
        }
    }

    /* Share of the board (0..1) covered in the last windowMs (10s by
       default; v1.6.1: squares are kept 60s for the slow check) */
    function trollCoverageShare(name, now, windowMs = TROLL_COVER.windowMs) {
        const cells = trollCoverage.get(name);

        if (!cells) {
            return 0;
        }

        let count = 0;

        cells.forEach((t, key) => {
            if (now - t > TROLL_COVER.slowMs) {
                cells.delete(key);
            } else if (now - t <= windowMs) {
                count++;
            }
        });

        const g = trollBoard();
        return count / (g.cols * g.rows);
    }

    function watchTrollCursors() {
        const el = liveTroll && liveTroll.enabled && customizationsEnabled
            ? document.querySelector(".CursorContainer")
            : null;

        if (el === trollCursorWatch.el) {
            return;
        }

        if (trollCursorWatch.observer) {
            trollCursorWatch.observer.disconnect();
        }

        trollCursorWatch = { el, observer: null };

        if (!el) {
            return;
        }

        trollCursorWatch.observer = new MutationObserver((records) => {
            const now = Date.now();
            const seen = new Set();

            records.forEach((record) => {
                /* the cursor itself moved, or FlockMod rewrote its name tag */
                const cursor = record.target.closest ? record.target.closest(".cursor") : null;

                if (!cursor || cursor.classList.contains("myself") || seen.has(cursor)) {
                    return;
                }

                seen.add(cursor);
                const label = cursor.querySelector(".pointerLabel");
                const name = label ? label.textContent.trim() : "";

                /* Only people being watched are recorded at all */
                if (!name || !trollWatched.has(name)) {
                    return;
                }

                const list = trollHistory.get(name) || [];
                const point = { t: now, x: parseFloat(cursor.style.left) || 0, y: parseFloat(cursor.style.top) || 0 };
                const circle = cursor.querySelector(".pointer");
                const text = cursor.querySelector(".textfield");
                /* text tool: the text size; otherwise the brush size */
                const size = text && text.style.display !== "none"
                    ? parseFloat(text.style.fontSize) || 0
                    : (circle ? parseFloat(circle.style.width) || 0 : 0);
                const prev = list[list.length - 1];

                if (!prev || prev.x !== point.x || prev.y !== point.y) {
                    trollStamp(name, prev && now - prev.t < 500 ? prev : null, point, size, now);
                }

                list.push(point);

                while (list.length && now - list[0].t > 3000) {
                    list.shift();
                }

                trollHistory.set(name, list);

                /* keep a flagged person's tag colored: repaint the moment
                   FlockMod wipes the color or the marker */
                if (trollFlagged.has(name) &&
                    (!cursor.classList.contains("fmTrollFlag") || !label.style.getPropertyValue("background-color"))) {
                    paintTrollCursor(cursor, true);
                }
            });
        });

        trollCursorWatch.observer.observe(el, { attributes: true, attributeFilter: ["style"], subtree: true });
    }

    /* Path length, how much of the board it covered, and how often
       it changed direction, over the last windowMs */
    function trollMotion(name, windowMs, now) {
        const list = (trollHistory.get(name) || []).filter((p) => now - p.t <= windowMs);
        let path = 0;
        let turns = 0;
        let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity;
        let lastDx = 0; let lastDy = 0;

        list.forEach((p, i) => {
            minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);

            if (i) {
                const dx = p.x - list[i - 1].x;
                const dy = p.y - list[i - 1].y;
                path += Math.hypot(dx, dy);

                /* a sharp reversal on either axis = a zig-zag turn */
                if ((dx * lastDx < 0 && Math.abs(dx) > 8) || (dy * lastDy < 0 && Math.abs(dy) > 8)) {
                    turns++;
                }

                if (Math.abs(dx) > 8) lastDx = dx;
                if (Math.abs(dy) > 8) lastDy = dy;
            }
        });

        return {
            moving: list.some((p) => now - p.t < 400),
            path,
            span: list.length ? Math.max(maxX - minX, maxY - minY) : 0,
            turns
        };
    }

    /* ---------- scoring ---------- */

    const trollState = new Map();      /* name -> { score, flagged, calmFor, reason, lastPopupAt } */
    const trollIgnored = new Set();    /* this session only */
    let trollLastTick = 0;

    function trollTick() {
        const st = liveTroll;

        if (!st || !st.enabled || !customizationsEnabled) {
            return;
        }

        watchTrollCursors();

        const now = Date.now();
        const dt = trollLastTick ? Math.min(1, (now - trollLastTick) / 1000) : 0.25;
        trollLastTick = now;

        const flagAfter = st.flagAfter / 10;
        const users = readUserRows();
        const cursors = readCursors();
        /* v1.6: sizes follow the board. Coverage meets in the middle: a
           big board needs a smaller share (it's a lot more area), a small
           board a bigger one (normal sketching covers it fast). */
        const k = trollBoard().k;
        const baseCover = (TROLL_SENSITIVITY[st.sensitivity] || TROLL_SENSITIVITY.normal).cover;
        const coverNeeded = Math.min(0.85, Math.max(baseCover * 0.45, baseCover / k));
        const sweepSpan = TROLL_SWEEP.span * k;
        /* Brushes and text stop at 140, so these only scale DOWN (small
           boards). On bigger boards a huge brush/eraser also has to make
           long, fast strokes, so painting a background calmly is fine. */
        const hugeBrushPx = st.bigBrushPx * Math.min(1, k);
        const hugeTextPx = st.bigTextPx * Math.min(1, k);
        const bigStroke = k <= 1 ? 0 : 450 * k;   /* path in the last 1.5s */
        const zigPath = 1200 * k;                  /* fast, long zig-zags */
        const zigSpan = 250 * k;
        /* v1.6.1 slow check (last minute): slowly erasing or drawing over
           a big part of the board. Erasing needs less than drawing, since
           drawing a lot over a minute is normal for artists. */
        const slowEraseNeeded = Math.min(0.85, coverNeeded * 1.5);
        const slowDrawNeeded = Math.min(0.9, coverNeeded * 2.5);

        /* Who to record: guests only (if that's on), never ignored people */
        trollWatched.clear();
        users.forEach((user, name) => {
            if (!(st.guestsOnly && !user.guest) && !trollIgnored.has(name)) {
                trollWatched.add(name);
            }
        });
        [...trollHistory.keys()].forEach((name) => {
            if (!trollWatched.has(name)) {
                trollHistory.delete(name);
                trollCoverage.delete(name);
            }
        });

        users.forEach((user, name) => {
            if ((st.guestsOnly && !user.guest) || trollIgnored.has(name)) {
                if (trollState.has(name)) {
                    setTrollFlag(name, false);
                    trollState.delete(name);
                }
                return;
            }

            const s = trollState.get(name) || { score: 0, flagged: false, calmFor: 0, reason: "", lastPopupAt: 0 };
            const cursor = cursors.get(name);
            const m = cursor ? trollMotion(name, TROLL_SWEEP.windowMs, now) : { moving: false };
            const covered = trollCoverageShare(name, now);
            const coveredSlow = trollCoverageShare(name, now, TROLL_COVER.slowMs);
            const pct = Math.round(covered * 100);
            const textPx = cursor ? cursor.textPx : 0;
            let reason = "";
            let instant = false;

            if (m.moving && user.tool === "selection" && st.selection && m.span >= sweepSpan) {
                /* select-all style sweep: the only thing flagged right away */
                reason = "Selected a big part of the board";
                instant = true;
            } else if (st.bigText && textPx >= hugeTextPx) {
                reason = `Huge text (${Math.round(textPx)}px)`;
            } else if (m.moving && covered >= coverNeeded) {
                if (textPx > 0 && st.bigText) {
                    reason = `Placed text across ${pct}% of the board`;
                } else if (user.tool === "eraser" && st.eraser) {
                    reason = `Erased ${pct}% of the board`;
                } else if (user.tool === "fill" && st.fill) {
                    reason = `Used fill across ${pct}% of the board`;
                } else if (!user.tool && st.scribble) {
                    reason = `Scribbled over ${pct}% of the board`;
                }
            }

            /* v1.6.1: slowly erasing / drawing over a big part of the board */
            if (!reason && m.moving && !textPx && user.tool !== "selection" && user.tool !== "fill") {
                const slowPct = Math.round(coveredSlow * 100);
                if (user.tool === "eraser" && st.eraser && coveredSlow >= slowEraseNeeded) {
                    reason = `Erased ${slowPct}% of the board in the last minute`;
                } else if (!user.tool && st.scribble && coveredSlow >= slowDrawNeeded) {
                    reason = `Drew over ${slowPct}% of the board in the last minute`;
                }
            }

            /* v1.6.1: fast, long zig-zags (lots of sharp turns over a wide area) */
            if (!reason && m.moving && !textPx && user.tool !== "selection" && user.tool !== "fill" &&
                m.turns >= 6 && m.path >= zigPath && m.span >= zigSpan) {
                if (user.tool === "eraser" && st.eraser) {
                    reason = "Fast zig-zag erasing";
                } else if (!user.tool && st.scribble) {
                    reason = "Fast zig-zag scribbles";
                }
            }

            /* Huge brush or eraser (on big boards: only with long, fast strokes) */
            if (!reason && m.moving && cursor && !textPx && user.tool !== "selection" && user.tool !== "fill" &&
                cursor.size >= hugeBrushPx && m.path >= bigStroke) {
                if (user.tool === "eraser" && (st.eraser || st.bigBrush)) {
                    reason = `Huge eraser (${Math.round(cursor.size)}px)`;
                } else if (!user.tool && st.bigBrush) {
                    reason = `Huge brush (${Math.round(cursor.size)}px)`;
                }
            }

            if (reason) {
                s.score = instant ? Math.max(s.score + dt, flagAfter) : s.score + dt;
                s.reason = reason;
                s.calmFor = 0;
            } else {
                s.score = Math.max(0, s.score - dt * 0.5);
                s.calmFor += dt;
            }

            if (!s.flagged && s.score >= flagAfter) {
                s.flagged = true;
                setTrollFlag(name, true, user);
                notifyTroll(name, s, st);
            } else if (s.flagged && st.warnAgain && s.score >= flagAfter) {
                /* v1.6.2: already red but still at it: warn again ("Warn again after" limits how often) */
                notifyTroll(name, s, st);
            } else if (s.flagged && st.stay > 0 && s.calmFor >= st.stay) {
                s.flagged = false;
                s.score = 0;
                setTrollFlag(name, false);
            } else if (s.flagged) {
                setTrollFlag(name, true, user); /* keep it on if FlockMod redrew the list */
            }

            trollState.set(name, s);
        });

        /* People who left the room */
        [...trollState.keys()].forEach((name) => {
            if (!users.has(name)) {
                trollState.delete(name);
                trollHistory.delete(name);
                trollCoverage.delete(name);
                setTrollFlag(name, false);
            }
        });

        /* Canvas name tags follow the flags */
        cursors.forEach((cursor, name) => {
            paintTrollCursor(cursor.el, trollFlagged.has(name));
        });
    }

    /* FlockMod rewrites its cursor elements while people move, which
       can wipe a class off. So the name tag also gets the color set
       directly on itself (with priority), and it's re-applied on every
       check and right when their cursor moves. */
    function paintTrollCursor(cursorEl, on) {
        const label = cursorEl.querySelector(".pointerLabel");
        cursorEl.classList.toggle("fmTrollFlag", on);

        if (!label) {
            return;
        }

        if (on) {
            const color = liveTroll ? liveTroll.color : "#ff3b3b";
            label.style.setProperty("background-color", color, "important");
            label.style.setProperty("background-image", "none", "important");
            label.style.setProperty("color", "#fff", "important");
            label.dataset.fmTroll = "1";
        } else if (label.dataset.fmTroll) {
            label.style.removeProperty("background-color");
            label.style.removeProperty("background-image");
            label.style.removeProperty("color");
            delete label.dataset.fmTroll;
        }
    }

    /* ---------- highlighting (your screen only) ---------- */

    const trollFlagged = new Set();

    function setTrollFlag(name, on, user) {
        const was = trollFlagged.has(name);

        if (on) {
            trollFlagged.add(name);
        } else {
            trollFlagged.delete(name);
        }

        const u = user || readUserRows().get(name);

        if (u) {
            u.row.classList.toggle("fmTrollFlag", on);

            if (on && !was) {
                playOnce(u.row, "fmTrollPulse");
            }
        }

        if (on !== was) {
            markTrollChat(document.getElementById("chatMessages"));
            cnRepaintNames();
        }
    }

    function clearAllTrollFlags() {
        trollFlagged.clear();
        trollState.clear();
        trollHistory.clear();
        document.querySelectorAll(".CursorContainer .cursor").forEach((el) => paintTrollCursor(el, false));
        document.querySelectorAll(".fmTrollFlag").forEach((el) => el.classList.remove("fmTrollFlag"));
        document.querySelectorAll(".fmTrollName").forEach((el) => el.classList.remove("fmTrollName"));
        document.querySelectorAll(".fmTrollToast").forEach((el) => el.remove());
    }

    /* In chat, a person's name is a small element outside the message
       text. Any such element whose text is a flagged name gets red.
       Only runs when a flag changes, or on new messages. */
    function markTrollChat(root) {
        if (!root) {
            return;
        }

        const blocks = root.matches && root.matches(".chatBlock")
            ? [root]
            : root.querySelectorAll(".chatBlock:not(.eventBlock):not(.motdBlock)");

        blocks.forEach((block) => {
            block.querySelectorAll("*").forEach((el) => {
                if (el.children.length || el.closest(".msgText, .msgTime")) {
                    return;
                }

                const text = el.textContent.trim().replace(/:$/, "");
                el.classList.toggle("fmTrollName", text !== "" && trollFlagged.has(text));
            });
        });
    }

    /* ---------- popup ---------- */

    /* Lives in FlockMod's popup layer (#dialogContainer), like the mod
       menu and References window: things added straight onto the
       page can end up hidden behind FlockMod's own layers. Placed
       with left/top like FlockMod's popups, near the top-right. */
    function trollToastBox() {
        const host = document.querySelector("#dialogContainer") || document.body;
        let box = document.querySelector(".fmTrollToasts");

        if (!box || box.parentElement !== host) {
            if (box) {
                box.remove();
            }

            box = document.createElement("div");
            box.className = "fmTrollToasts";
            host.appendChild(box);
        }

        placeTrollToasts(box);
        return box;
    }

    function placeTrollToasts(box) {
        const width = 270;
        const host = box.parentElement;
        const hostRect = host ? host.getBoundingClientRect() : { left: 0, top: 0 };

        /* viewport position, converted into the host's coordinates */
        box.style.left = `${Math.max(8, window.innerWidth - width - 20) - hostRect.left}px`;
        box.style.top = `${70 - hostRect.top}px`;
    }

    window.addEventListener("resize", () => {
        const box = document.querySelector(".fmTrollToasts");

        if (box) {
            placeTrollToasts(box);
        }
    });

    function notifyTroll(name, s, st) {
        const now = Date.now();

        if (now - s.lastPopupAt < (st.popupEvery || 60) * 1000) {
            return; /* at most one warning per person per "Warn again after" */
        }

        s.lastPopupAt = now;
        fireSoundEvent("Troll");

        if (!st.popup) {
            return;
        }

        const box = trollToastBox();

        while (box.children.length >= 3) {
            box.firstElementChild.remove();
        }

        const toast = document.createElement("div");
        toast.className = "fmTrollToast";
        toast.innerHTML = `
            <div class="fmTrollToastTitle">
                <i class="fas fa-exclamation-triangle"></i>
                <b>${escapeHTML(name)}</b> might be griefing
            </div>
            <div class="fmTrollToastWhy">${escapeHTML(s.reason)}</div>
            <div class="fmTrollToastButtons">
                <button type="button" data-troll="show">Show in list</button>
                <button type="button" data-troll="ignore">Ignore</button>
                <button type="button" data-troll="close" title="Close">✕</button>
            </div>`;

        toast.addEventListener("click", (event) => {
            const action = event.target.closest("[data-troll]");

            if (!action) {
                return;
            }

            if (action.dataset.troll === "show") {
                const u = readUserRows().get(name);

                if (u) {
                    u.row.scrollIntoView({ block: "nearest", behavior: "smooth" });
                    playOnce(u.row, "fmTrollPulse");
                    /* their name in the highlight color for a few seconds, so it's easy to spot */
                    clearTimeout(u.row._fmShownT);
                    u.row.classList.add("fmTrollShown");
                    u.row._fmShownT = setTimeout(() => u.row.classList.remove("fmTrollShown"), 6000);
                }
            } else if (action.dataset.troll === "ignore") {
                trollIgnored.add(name);
                setTrollFlag(name, false);
                trollState.delete(name);
            }

            fadeOutTrollToast(toast);
        });

        box.appendChild(toast);
        setTimeout(() => fadeOutTrollToast(toast), 15000);
    }

    /* Fades the warning out (with Animations > Popups on), then removes it */
    function fadeOutTrollToast(toast) {
        if (!toast.isConnected || toast.classList.contains("fmTrollToastOut")) {
            return;
        }

        if (!document.documentElement.classList.contains("fmAnimPopups")) {
            toast.remove();
            return;
        }

        toast.classList.add("fmTrollToastOut");
        toast.addEventListener("animationend", () => toast.remove(), { once: true });
        setTimeout(() => toast.remove(), 600 * animSpeedFactor());   /* backup */
    }

    /* ---------- Safety panel ---------- */

    function buildSafetyPanelHTML() {
        const row = (id, name, desc) => `
                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">${name}</div>
                                    <div class="themeModSettingDescription">${desc}</div>
                                </div>
                                ${animToggleHTML(id)}
                            </div>`;

        const range = (id, name, desc, min, max, step, value, label) => `
                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">${name}</div>
                                    <div class="themeModSettingDescription">${desc}</div>
                                </div>
                                <div class="themeModRangeControl">
                                    <input type="range" id="${id}" class="themeModRange" min="${min}" max="${max}" step="${step}" value="${value}">
                                    <span id="${id}Value" class="themeModRangeValue">${label}</span>
                                </div>
                            </div>`;

        return `
                        <div class="themeModSectionContent" data-theme-panel="safety">

                            <div class="themeModSubsectionTitle">
                                Troll Detection
                            </div>

                            ${row("themeModTrollEnabled", "Troll detection",
                                "Turns a possible griefer's name red and can show a small warning.")}

                            ${row("themeModTrollGuestsOnly", "Guests only", "Only watch guests. OFF watches everyone except you.")}

                            <div class="themeModSetting themeModNoDivider themeModTrollSensRow">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Sensitivity</div>
                                    <div class="themeModSettingDescription themeModTrollSensText"></div>
                                </div>
                                <div class="themeModDecoSeg themeModTrollSens" role="radiogroup" aria-label="Sensitivity">
                                    ${Object.entries(TROLL_SENSITIVITY).map(([k, v]) => `<button type="button" role="radio" data-troll-sens="${k}">${v.label}</button>`).join("")}
                                </div>
                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Timing
                            </div>

                            ${range("themeModTrollFlagAfter", "Flag after",
                                "How long they have to keep it up. Giant select-alls are flagged right away.",
                                5, 80, 5, 15, "1.5s")}

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Stay red for</div>
                                    <div class="themeModSettingDescription">How long a name stays flagged after they calm down.</div>
                                </div>
                                <select id="themeModTrollStay" class="themeModSelect">
                                    ${TROLL_STAY_CHOICES.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}
                                </select>
                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Watch For
                            </div>

                            ${row("themeModTrollSelection", "Big selections",
                                "Selecting most of the board (select-all-and-delete).")}
                            ${row("themeModTrollScribble", "Scribbling",
                                "Scribbling over a big part of the board.")}
                            ${row("themeModTrollEraser", "Eraser", "Erasing a big part of the board. Small fixes don't count.")}
                            ${row("themeModTrollFill", "Fill", "Filling all over the board.")}
                            ${row("themeModTrollBigBrush", "Huge brush", "Drawing with a very big brush.")}
                            ${range("themeModTrollBigBrushPx", "Huge brush from", "On a normal-size board. Scales with the board's size.", 40, 140, 10, 140, "140px")}
                            ${row("themeModTrollBigText", "Huge text", "A very big text size, or text all over the board.")}
                            ${range("themeModTrollBigTextPx", "Huge text from", "On a normal-size board. Scales with the board's size.", 30, 140, 10, 100, "100px")}

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Warnings
                            </div>

                            ${row("themeModTrollPopup", "Warning popup", "A small note with their name.")}
                            ${row("themeModTrollWarnAgain", "Keep warning", "Warn again if someone already red keeps trolling.")}

                            <div class="themeModSetting">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Warn again after</div>
                                    <div class="themeModSettingDescription">The shortest wait before the same person can be warned again.</div>
                                </div>
                                <select id="themeModTrollPopupEvery" class="themeModSelect">
                                    ${TROLL_POPUP_EVERY_CHOICES.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}
                                </select>
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Highlight color</div>
                                    <div class="themeModSettingDescription">The color flagged names turn.</div>
                                </div>
                                <input type="color" id="themeModTrollColor" value="#ff3b3b">
                            </div>

                            <div class="themeModLocalNote">
                                <i class="fas fa-shield-alt"></i>
                                <span>Only you see this, and nothing is sent to FlockMod. It's a best guess from people's cursors, so please check before acting. For a sound, turn on "Possible griefer" in Sounds.</span>
                            </div>

                        </div>`;
    }

    function setupSafetyPanel(dialog) {
        const toggleIds = {
            enabled: "#themeModTrollEnabled",
            guestsOnly: "#themeModTrollGuestsOnly",
            eraser: "#themeModTrollEraser",
            fill: "#themeModTrollFill",
            selection: "#themeModTrollSelection",
            bigBrush: "#themeModTrollBigBrush",
            scribble: "#themeModTrollScribble",
            bigText: "#themeModTrollBigText",
            popup: "#themeModTrollPopup",
            warnAgain: "#themeModTrollWarnAgain"
        };
        const toggles = {};
        Object.entries(toggleIds).forEach(([k, sel]) => { toggles[k] = dialog.querySelector(sel); });
        const flagAfter = dialog.querySelector("#themeModTrollFlagAfter");
        const flagAfterValue = dialog.querySelector("#themeModTrollFlagAfterValue");
        const bigPx = dialog.querySelector("#themeModTrollBigBrushPx");
        const bigPxValue = dialog.querySelector("#themeModTrollBigBrushPxValue");
        const stay = dialog.querySelector("#themeModTrollStay");
        const popupEvery = dialog.querySelector("#themeModTrollPopupEvery");
        const color = dialog.querySelector("#themeModTrollColor");
        const textPx = dialog.querySelector("#themeModTrollBigTextPx");
        const textPxValue = dialog.querySelector("#themeModTrollBigTextPxValue");
        const sensBox = dialog.querySelector(".themeModTrollSens");
        const sensText = dialog.querySelector(".themeModTrollSensText");
        let sensitivity = TROLL_DEFAULTS.sensitivity;

        function setSens(value) {
            sensitivity = TROLL_SENSITIVITY[value] ? value : "normal";
            sensBox.querySelectorAll("[data-troll-sens]").forEach((b) => {
                const on = b.dataset.trollSens === sensitivity;
                b.classList.toggle("themeModDecoSegOn", on);
                b.setAttribute("aria-checked", String(on));
            });
            const s = TROLL_SENSITIVITY[sensitivity];
            sensText.innerHTML = `<b>${s.label}:</b> flags someone covering about <b>${Math.round(s.cover * 100)}%</b> of the board in 10 seconds.`;
        }

        function labels() {
            flagAfterValue.textContent = `${(Number(flagAfter.value) / 10).toFixed(1)}s`;
            bigPxValue.textContent = `${bigPx.value}px`;
            textPxValue.textContent = `${textPx.value}px`;
        }

        function fill(st) {
            Object.keys(toggles).forEach((k) => { toggles[k].checked = st[k]; });
            flagAfter.value = String(st.flagAfter);
            bigPx.value = String(st.bigBrushPx);
            textPx.value = String(st.bigTextPx);
            setSens(st.sensitivity);
            stay.value = String(st.stay);
            popupEvery.value = String(st.popupEvery);
            color.value = st.color;
            labels();
        }

        function readInputs() {
            const st = {
                flagAfter: Number(flagAfter.value),
                bigBrushPx: Number(bigPx.value),
                bigTextPx: Number(textPx.value),
                sensitivity,
                stay: Number(stay.value),
                popupEvery: Number(popupEvery.value),
                color: color.value
            };
            Object.keys(toggles).forEach((k) => { st[k] = toggles[k].checked; });
            return st;
        }

        const preview = () => {
            labels();
            applyTroll(readInputs());
        };

        fill(readSavedTroll());
        Object.values(toggles).forEach((t) => t.addEventListener("change", preview));
        [flagAfter, bigPx, textPx].forEach((r) => r.addEventListener("input", preview));
        sensBox.addEventListener("click", (event) => {
            const b = event.target.closest("[data-troll-sens]");
            if (b && b.dataset.trollSens !== sensitivity) {
                setSens(b.dataset.trollSens);
                preview();
            }
        });
        stay.addEventListener("change", preview);
        popupEvery.addEventListener("change", preview);
        color.addEventListener("input", preview);

        const write = (st) => Object.keys(TROLL_LS).forEach((k) => localStorage.setItem(TROLL_LS[k], st[k]));

        return {
            save() {
                write(readInputs());
                applySavedTroll();
            },
            reset() {
                const st = { ...TROLL_DEFAULTS };
                fill(st);
                write(st);
                applyTroll(st);
            }
        };
    }

    function setupThumbShape(dialog) {
        const toggle = dialog.querySelector("#themeModThumbShapeEnabled");
        const select = dialog.querySelector("#themeModThumbShape");
        const preview = dialog.querySelector(".themeModThumbPreview");
        const sizeSlider = dialog.querySelector("#themeModThumbShapeSize");
        const sizeValue = dialog.querySelector("#themeModThumbShapeSizeValue");

        if (!toggle || !select) {
            return;
        }

        const saved = readSavedThumbShape();
        toggle.checked = saved.enabled;
        select.value = saved.shape;
        sizeSlider.value = String(saved.size);
        sizeValue.textContent = `${saved.size}%`;

        async function updatePreview() {
            const url = await getThumbMaskURL(select.value);
            preview.style.setProperty("--flockmod-thumb-preview", `url("${url}")`);
        }

        const run = () => {
            sizeValue.textContent = `${sizeSlider.value}%`;
            applyThumbShape(toggle.checked, select.value, Number(sizeSlider.value));
            updatePreview();
        };

        toggle.addEventListener("change", run);
        select.addEventListener("change", run);
        sizeSlider.addEventListener("input", run);
        updatePreview();

        dialog.querySelector(".themeModApplyButton").addEventListener("click", () => {
            localStorage.setItem(THUMB_SHAPE_ENABLED_LS, String(toggle.checked));
            localStorage.setItem(THUMB_SHAPE_LS, select.value);
            localStorage.setItem(THUMB_SHAPE_SIZE_LS, sizeSlider.value);
        });

        dialog.querySelector(".themeModResetButton").addEventListener("click", () => {
            toggle.checked = false;
            select.value = "heart";
            sizeSlider.value = "100";
            localStorage.setItem(THUMB_SHAPE_ENABLED_LS, "false");
            localStorage.setItem(THUMB_SHAPE_LS, "heart");
            localStorage.setItem(THUMB_SHAPE_SIZE_LS, "100");
            run();
        });

        dialog.querySelector(".closeButton").addEventListener("click", applySavedThumbShape);
    }

    const FONT_LIBRARY_LS = "flockmodFontLibrary";
    const FONT_DB_NAME = "flockmodThemeModFonts";
    const FONT_DB_STORE = "files";
    const MAX_FONT_FILE_BYTES = 3 * 1024 * 1024;
    const FONT_NAME_PATTERN = /^[A-Za-z0-9][A-Za-z0-9 _-]{0,39}$/;

    const fontLoadCache = new Map();

    function isCustomFontValue(value) {
        return /^(google|upload):/.test(value);
    }

    function isValidFontValue(value) {
        if (typeof value !== "string") {
            return false;
        }

        if (FONT_CHOICES.includes(value)) {
            return true;
        }

        const match = value.match(/^(google|upload):(.+)$/);
        return Boolean(match && FONT_NAME_PATTERN.test(match[2]));
    }

    function fontValueLabel(value) {
        const match = value.match(/^(google|upload):(.+)$/);
        return match ? match[2] : value;
    }

    /* The family name we register with the browser. Prefixed so it
       can never clash with a font FlockMod itself uses. */
    function customFontFamily(value) {
        return "FMThemeMod " + value.replace(":", " ");
    }

    function getFontLibrary() {
        try {
            const list = JSON.parse(localStorage.getItem(FONT_LIBRARY_LS) || "[]");
            return Array.isArray(list) ? list.filter(isValidFontValue).filter(isCustomFontValue) : [];
        } catch (error) {
            return [];
        }
    }

    function setFontLibrary(list) {
        localStorage.setItem(FONT_LIBRARY_LS, JSON.stringify([...new Set(list)]));
    }

    /* ---- IndexedDB for uploaded font files ---- */

    function openFontDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(FONT_DB_NAME, 1);
            request.onupgradeneeded = () => request.result.createObjectStore(FONT_DB_STORE);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function fontDB(mode, action) {
        const db = await openFontDB();

        return new Promise((resolve, reject) => {
            const tx = db.transaction(FONT_DB_STORE, mode);
            const request = action(tx.objectStore(FONT_DB_STORE));
            tx.oncomplete = () => { db.close(); resolve(request && request.result); };
            tx.onerror = () => { db.close(); reject(tx.error); };
        });
    }

    const putFontFile = (name, buffer) => fontDB("readwrite", (store) => store.put(buffer, name));
    const getFontFile = (name) => fontDB("readonly", (store) => store.get(name));
    const deleteFontFile = (name) => fontDB("readwrite", (store) => store.delete(name));

    /* ---- Google Fonts ---- */

    async function fetchGoogleFontCSS(name) {
        const family = encodeURIComponent(name).replace(/%20/g, "+");
        const urls = [
            `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;600;700&display=swap`,
            `https://fonts.googleapis.com/css2?family=${family}&display=swap`
        ];

        for (const url of urls) {
            const response = await fetch(url);
            if (response.ok) {
                return response.text();
            }
        }

        throw new Error(`Google Fonts doesn't have a font called "${name}".`);
    }

    async function loadGoogleFontFaces(name, family) {
        const css = await fetchGoogleFontCSS(name);
        const blocks = css.match(/@font-face\s*{[^}]*}/g) || [];

        /* Only the Latin subsets, which cover the interface text */
        const wanted = blocks.filter((block) => {
            const range = (block.match(/unicode-range:\s*([^;]+);/) || [])[1] || "";
            return !range || /U\+0000-00FF|U\+0100-02BA|U\+0100-024F/i.test(range);
        });

        const faces = await Promise.all((wanted.length ? wanted : blocks).map(async (block) => {
            const url = (block.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/) || [])[1];

            if (!url) {
                return null;
            }

            const weight = (block.match(/font-weight:\s*([^;]+);/) || [])[1] || "400";
            const style = (block.match(/font-style:\s*([^;]+);/) || [])[1] || "normal";
            const range = (block.match(/unicode-range:\s*([^;]+);/) || [])[1];
            const buffer = await (await fetch(url)).arrayBuffer();

            const descriptors = { weight: weight.trim(), style: style.trim() };
            if (range) {
                descriptors.unicodeRange = range.trim();
            }

            return new FontFace(family, buffer, descriptors);
        }));

        return faces.filter(Boolean);
    }

    /* Makes sure a custom font is registered. Resolves to true/false. */
    function ensureFontLoaded(value) {
        if (!isCustomFontValue(value)) {
            return Promise.resolve(true);
        }

        if (fontLoadCache.has(value)) {
            return fontLoadCache.get(value);
        }

        const family = customFontFamily(value);
        const name = fontValueLabel(value);

        const promise = (async () => {
            let faces;

            if (value.startsWith("google:")) {
                faces = await loadGoogleFontFaces(name, family);
            } else {
                const buffer = await getFontFile(name);
                if (!buffer) {
                    throw new Error(`The uploaded font "${name}" isn't on this computer.`);
                }
                faces = [new FontFace(family, buffer)];
            }

            if (!faces.length) {
                throw new Error(`Couldn't load "${name}".`);
            }

            await Promise.all(faces.map((face) => face.load()));
            faces.forEach((face) => document.fonts.add(face));
            return true;
        })();

        /* Failed loads can be retried later */
        promise.catch(() => fontLoadCache.delete(value));
        fontLoadCache.set(value, promise);
        return promise;
    }

    /* Applies a font value to the page (the one place that does it) */
    function applyFontValue(value) {
        const root = document.documentElement;

        const isDefault = !value || value === "default" || !isValidFontValue(value);
        root.classList.toggle("flockmodFontActive", !isDefault);

        if (isDefault) {
            root.style.removeProperty("--flockmod-custom-ui-font");
            return;
        }

        if (!isCustomFontValue(value)) {
            root.style.setProperty("--flockmod-custom-ui-font", `"${value}", sans-serif`);
            return;
        }

        /* Set right away: the text switches over as soon as the font
           finishes loading. If it can't load, the fallback is used. */
        root.style.setProperty(
            "--flockmod-custom-ui-font",
            `"${customFontFamily(value)}", Rubik, sans-serif`
        );

        ensureFontLoaded(value).catch(() => {});
    }

    function buildFontOptionsHTML(selectedValue) {
        const builtIn = [
            ["default", "FlockMod default"],
            ["Arial", "Arial"],
            ["Verdana", "Verdana"],
            ["Trebuchet MS", "Trebuchet MS"],
            ["Georgia", "Georgia"]
        ];

        const library = getFontLibrary();

        /* A theme may use a font you haven't added (e.g. from a code) */
        if (isCustomFontValue(selectedValue) && !library.includes(selectedValue)) {
            library.push(selectedValue);
        }

        let html = builtIn.map(([value, label]) =>
            `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`
        ).join("");

        if (library.length) {
            html += `<optgroup label="Your fonts">` + library.map((value) =>
                `<option value="${escapeHTML(value)}">${escapeHTML(fontValueLabel(value))}${value.startsWith("google:") ? " (Google)" : ""}</option>`
            ).join("") + `</optgroup>`;
        }

        return html;
    }

    function setupCustomFonts(dialog, fontSelect) {
        const nameInput = dialog.querySelector(".themeModGoogleFontName");
        const addButton = dialog.querySelector(".themeModGoogleFontAdd");
        const uploadButton = dialog.querySelector(".themeModFontUpload");
        const fileInput = dialog.querySelector(".themeModFontFile");
        const status = dialog.querySelector(".themeModFontStatus");
        const list = dialog.querySelector(".themeModFontList");

        function showStatus(message, kind = "ok") {
            status.textContent = message;
            status.dataset.kind = kind;
            status.style.display = message ? "block" : "none";
        }

        function refreshSelect(selectValue) {
            const keep = selectValue || fontSelect.value;
            fontSelect.innerHTML = buildFontOptionsHTML(keep);
            fontSelect.value = isValidFontValue(keep) ? keep : "default";
            if (!fontSelect.value) {
                fontSelect.value = "default";
            }
        }

        function renderList() {
            const library = getFontLibrary();

            list.innerHTML = library.length
                ? library.map((value) => `
                    <div class="themeModFontItem" data-value="${escapeHTML(value)}">
                        <span class="themeModFontSample" style="font-family: '${escapeHTML(customFontFamily(value))}', sans-serif;">
                            ${escapeHTML(fontValueLabel(value))}
                        </span>
                        <span class="themeModFontKind">${value.startsWith("google:") ? "Google" : "Uploaded"}</span>
                        <button type="button" class="themeModButton themeModDangerButton" data-action="remove">Remove</button>
                    </div>
                `).join("")
                : "";

            /* Load each so its name previews in its own font */
            library.forEach((value) => ensureFontLoaded(value).catch(() => {}));
        }

        async function addFont(value, successMessage) {
            showStatus("Loading font...");

            try {
                await ensureFontLoaded(value);
            } catch (error) {
                showStatus(error.message || "Couldn't load that font.", "error");
                return false;
            }

            setFontLibrary([...getFontLibrary(), value]);
            refreshSelect(value);
            applyFontValue(value);       /* preview it; Apply saves the choice */
            renderList();
            showStatus(successMessage + " Press Apply Changes to keep it.");
            return true;
        }

        async function addGoogleFont() {
            const name = nameInput.value.trim().replace(/\s+/g, " ");

            if (!FONT_NAME_PATTERN.test(name)) {
                showStatus("Type a Google Fonts name, like \"Poppins\" or \"Comic Neue\".", "error");
                return;
            }

            addButton.disabled = true;

            try {
                if (await addFont(`google:${name}`, `Added "${name}" from Google Fonts.`)) {
                    nameInput.value = "";
                }
            } catch (error) {
                showStatus("Couldn't reach Google Fonts. Check your connection.", "error");
            } finally {
                addButton.disabled = false;
            }
        }

        addButton.addEventListener("click", addGoogleFont);
        nameInput.addEventListener("themeModEnter", addGoogleFont);

        uploadButton.addEventListener("click", () => fileInput.click());

        fileInput.addEventListener("change", async () => {
            const file = fileInput.files && fileInput.files[0];
            fileInput.value = "";

            if (!file) {
                return;
            }

            if (!/\.(ttf|otf|woff2?)$/i.test(file.name)) {
                showStatus("That isn't a font file. Use .ttf, .otf, .woff or .woff2.", "error");
                return;
            }

            if (file.size > MAX_FONT_FILE_BYTES) {
                showStatus("That font file is too big (3 MB max).", "error");
                return;
            }

            let name = file.name
                .replace(/\.(ttf|otf|woff2?)$/i, "")
                .replace(/[^A-Za-z0-9 _-]/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 40) || "My font";

            if (!/^[A-Za-z0-9]/.test(name)) {
                name = "Font " + name;
            }

            const value = `upload:${name.slice(0, 40)}`;

            try {
                const buffer = await file.arrayBuffer();

                /* Make sure the browser can actually read it first */
                await new FontFace("FMThemeModCheck", buffer).load();

                await putFontFile(fontValueLabel(value), buffer);
                fontLoadCache.delete(value);
                await addFont(value, `Added "${fontValueLabel(value)}".`);
            } catch (error) {
                showStatus("That font file couldn't be read. It may be damaged.", "error");
            }
        });

        list.addEventListener("click", async (event) => {
            const button = event.target.closest('button[data-action="remove"]');
            const item = event.target.closest(".themeModFontItem");

            if (!button || !item) {
                return;
            }

            const value = item.dataset.value;

            if (button.dataset.confirm !== "yes") {
                button.dataset.confirm = "yes";
                button.textContent = "Sure?";
                setTimeout(() => {
                    if (button.isConnected) {
                        button.dataset.confirm = "";
                        button.textContent = "Remove";
                    }
                }, 3000);
                return;
            }

            setFontLibrary(getFontLibrary().filter((v) => v !== value));

            if (value.startsWith("upload:")) {
                try {
                    await deleteFontFile(fontValueLabel(value));
                } catch (error) { /* already gone */ }
            }

            const wasSelected = fontSelect.value === value;
            refreshSelect(wasSelected ? "default" : fontSelect.value);

            if (wasSelected) {
                applyFontValue("default");
            }

            renderList();
            showStatus(`Removed "${fontValueLabel(value)}".` + (wasSelected ? " Switched back to the default font; press Apply Changes to keep that." : ""));
        });

        renderList();
    }

    function applySavedFont() {
        const savedFont =
            localStorage.getItem("flockmodCustomUIFont") || "default";

        applyFontValue(customizationsEnabled ? savedFont : "default");
    }

    function applySavedFontSize() {
        const savedFontSize =
            localStorage.getItem("flockmodCustomUIFontSize") || "100";

        if (customizationsEnabled) {
            applyFontSizePreview(savedFontSize);
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font-size"
            );
        }
    }

    function applySavedFontWeight() {
        const savedFontWeight =
            localStorage.getItem("flockmodCustomUIFontWeight") || "regular";

        if (customizationsEnabled) {
            applyFontWeightPreview(savedFontWeight);
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font-weight"
            );
        }
    }

    function applySavedSpacing() {
        const savedSpacing =
            localStorage.getItem("flockmodCustomUISpacing") || "100";

        if (customizationsEnabled) {
            applySpacingPreview(savedSpacing);
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-ui-spacing"
            );
        }
    }

    function applySavedSelectedColor() {
        const savedSelected =
            localStorage.getItem("flockmodCustomSelectedColor") || "#4f5156";

        applySelectedEnabledPreview(
            isSavedOnByDefault("flockmodCustomSelectedColorEnabled")
        );

        if (customizationsEnabled) {
            applySelectedColorPreview(savedSelected);
        }
    }

    function applySavedHoverColor() {
        const savedHover =
            localStorage.getItem("flockmodCustomHoverColor") || "#4f5156";

        applyHoverEnabledPreview(
            isSavedOnByDefault("flockmodCustomHoverColorEnabled")
        );

        if (customizationsEnabled) {
            applyHoverColorPreview(savedHover);
        }
    }

    function applySavedText1Color() {
        const savedEnabled =
            localStorage.getItem("flockmodCustomText1ColorEnabled") === "true";

        const savedColor =
            localStorage.getItem("flockmodCustomText1Color") || "#ffffff";

        if (customizationsEnabled) {
            applyText1ColorEnabledPreview(savedEnabled);
            applyText1ColorPreview(savedColor);
        } else {
            applyText1ColorEnabledPreview(false);
        }
    }

    function applySavedText2Color() {
        const savedEnabled =
            localStorage.getItem("flockmodCustomText2ColorEnabled") === "true";

        const savedColor =
            localStorage.getItem("flockmodCustomText2Color") || "#ffffff";

        if (customizationsEnabled) {
            applyText2ColorEnabledPreview(savedEnabled);
            applyText2ColorPreview(savedColor);
        } else {
            applyText2ColorEnabledPreview(false);
        }
    }

    function addModButton() {
        const bottomBar = document.querySelector(
            "#bottombar > nav > div > ul:nth-child(3)"
        );

        if (!bottomBar) {
            return false;
        }

        if (bottomBar.querySelector(MOD_BUTTON_SELECTOR)) {
            return true;
        }

        const modItem = document.createElement("li");
        modItem.className = "nav-item";

        const modButton = document.createElement("a");
        modButton.href = "#";
        modButton.className = "nav-link themeModMenuButton";

        modButton.innerHTML = `
            <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
                style="fill: currentColor;"
            >
                <g transform="translate(12 12)">
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8"/>
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8" transform="rotate(72)"/>
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8" transform="rotate(144)"/>
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8" transform="rotate(216)"/>
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8" transform="rotate(288)"/>
                    <circle cx="0" cy="0" r="2.5"/>
                </g>
            </svg>
        `;

        modButton.title = "Theme Mod Menu";
        modButton.classList.add("fmFlowerButton");

        modButton.addEventListener("click", (event) => {
            event.preventDefault();
            toggleModMenu();
        });

        modItem.appendChild(modButton);
        bottomBar.insertBefore(modItem, bottomBar.children[1]);
        refreshFlowerUpdateDot();

        return true;
    }


    /* =========================================================
       THEMES: share codes, saved themes, presets
       ---------------------------------------------------------
       A "theme" is every look-related setting (not the on/off
       "Enable customizations" switch). In a code each setting is
       stored by a stable id = its localStorage key without the
       "flockmod"/"flockmodCustom" prefix.

       !! COMPATIBILITY RULE !!
       Never rename or reuse a setting's localStorage key. If one
       ever has to change, bump THEME_FORMAT_VERSION and add an
       entry to THEME_MIGRATIONS that translates old ids to new
       ones, so older codes keep working.
       ========================================================= */

    const THEME_FORMAT_VERSION = 1;
    const THEME_CODE_PREFIX = "FMTHEME";
    const SAVED_THEMES_LS = "flockmodSavedThemes";
    const THEME_UNDO_LS = "flockmodThemeUndo";

    /* Upgrades a code's settings one version at a time.
       Example for the future:
       1: (s) => { s.NewName = s.OldName; delete s.OldName; return s; } */
    const THEME_MIGRATIONS = {};

    const FONT_CHOICES = ["default", "Arial", "Verdana", "Trebuchet MS", "Georgia"];
    const FONT_WEIGHT_CHOICES = ["regular", "medium", "semibold", "bold"];

    let themeFieldsCache = null;

    function getThemeFields() {
        if (themeFieldsCache) {
            return themeFieldsCache;
        }

        const fields = [];
        const add = (ls, type, def, extra = {}) => {
            fields.push({
                id: ls.replace(/^flockmod(Custom)?/, ""),
                ls,
                type,
                def,
                ...extra
            });
        };

        [
            ...TOGGLE_COLOR_SETTINGS,
            ...BAR_COLOR_SETTINGS,
            ...SIMPLE_COLOR_SETTINGS
        ].forEach((setting) => {
            add(setting.lsEnabled, "bool", false);
            add(setting.lsColor, "color", setting.defaultColor);
        });

        /* Gradients (added later; codes without them = gradients off) */
        getAllGradientInfos().forEach((g) => {
            add(g.lsEnabled, "bool", false);
            add(g.lsColor, "color", g.defaultColor);
            add(g.lsAngle, "int", g.defaultAngle, { min: 0, max: 360 });
        });

        add(CANVAS_DIM_STRENGTH_LS, "int", CANVAS_DIM_STRENGTH_DEFAULT, { min: 5, max: 90 });
        add("flockmodCustomText1ColorEnabled", "bool", false);
        add("flockmodCustomText1Color", "color", "#ffffff");
        add("flockmodCustomText2ColorEnabled", "bool", false);
        add("flockmodCustomText2Color", "color", "#ffffff");
        add("flockmodCustomSelectedColorEnabled", "bool", true);
        add("flockmodCustomSelectedColor", "color", "#4f5156");
        add("flockmodCustomHoverColorEnabled", "bool", true);
        add("flockmodCustomHoverColor", "color", "#4f5156");
        add(SIMPLE_MODE_LS, "bool", false);

        /* Background look settings (not the images themselves) */
        BACKGROUND_PLACES.forEach((place) => {
            bgFieldsFor(place).forEach(([suffix, type, def, extra]) => {
                add(bgLsKey(place, suffix), type, def, extra || {});
            });
        });

        add("flockmodCustomUIFont", "font", "default");
        add("flockmodCustomUIFontWeight", "enum", "regular", { choices: FONT_WEIGHT_CHOICES });
        add("flockmodCustomUIFontSize", "int", 100, { min: 90, max: 110 });
        add("flockmodCustomUISpacing", "int", 100, { min: 75, max: 125 });
        add("flockmodCustomUIRadius", "int", 5, { min: 0, max: 12 });
        add(THUMB_SHAPE_ENABLED_LS, "bool", false);
        add(THUMB_SHAPE_LS, "enum", "heart", { choices: THUMB_SHAPE_CHOICES });
        add(THUMB_SHAPE_SIZE_LS, "int", 100, { min: 100, max: 150 });
        add(DECO_LS.style, "enum", "none", { choices: DECO_STYLE_CHOICES });
        add(DECO_LS.placement, "enum", "side", { choices: DECO_PLACEMENT_CHOICES });
        add(DECO_LS.size, "int", 100, { min: 70, max: 150 });
        add(DECO_LS.match, "bool", true);
        add(DECO_LS.menu, "bool", false);
        add(DECO_LS.frame, "bool", false);
        /* "auto" = older codes: decided by the match switch above */
        add(DECO_LS.colorMode, "enum", "auto", { choices: ["auto", ...DECO_COLOR_MODES] });
        add(DECO_LS.frameCustom, "bool", false);
        add(DECO_LS.frameBorder, "bool", false);
        DECO_FRAME_PICKERS.forEach(([k, ls]) => add(DECO_LS[ls], "color", DECO_FRAME_FALLBACK[k]));
        add(BUB_LS.style, "enum", "none", { choices: BUB_STYLE_CHOICES });
        add(BUB_LS.right, "bool", true);
        add(BUB_LS.others, "bool", true);
        add(BUB_LS.deco, "bool", true);
        add(BUB_LS.custom, "bool", false);
        Object.keys(BUB_CUSTOM_DEFAULTS).forEach((k) => add(BUB_LS[k], "color", BUB_CUSTOM_DEFAULTS[k]));
        Object.keys(DECO_COLOR_DEFAULTS).forEach((k) => add(DECO_LS[k], "color", DECO_COLOR_DEFAULTS[k]));

        themeFieldsCache = fields;
        return fields;
    }

    function isValidThemeValue(field, value) {
        switch (field.type) {
            case "bool":
                return typeof value === "boolean";
            case "color":
                return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
            case "int":
                return Number.isInteger(value) && value >= field.min && value <= field.max;
            case "enum":
                return field.choices.includes(value);
            case "font":
                return isValidFontValue(value);
            default:
                return false;
        }
    }

    function readThemeField(field) {
        const raw = localStorage.getItem(field.ls);

        if (raw === null) {
            return field.def;
        }

        let value = raw;

        if (field.type === "bool") {
            value = raw === "true";
        } else if (field.type === "int") {
            value = Number(raw);
        } else if (field.type === "color") {
            value = raw.toLowerCase();
        }

        return isValidThemeValue(field, value) ? value : field.def;
    }

    /* Current applied theme, only the settings that differ from
       default (keeps codes short; missing = default on import) */
    function getCurrentThemeSettings() {
        const settings = {};

        getThemeFields().forEach((field) => {
            const value = readThemeField(field);
            const def = field.type === "color" ? field.def.toLowerCase() : field.def;

            if (value !== def) {
                settings[field.id] = value;
            }
        });

        return settings;
    }

    function toBase64Url(text) {
        const bytes = new TextEncoder().encode(text);
        let binary = "";
        bytes.forEach((b) => { binary += String.fromCharCode(b); });
        return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    function fromBase64Url(text) {
        let b64 = text.replace(/-/g, "+").replace(/_/g, "/");
        while (b64.length % 4) {
            b64 += "=";
        }
        const binary = atob(b64);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    }

    function encodeThemeCode(settings, name) {
        const payload = { v: THEME_FORMAT_VERSION, s: settings };

        if (name) {
            payload.n = String(name).slice(0, 40);
        }

        return `${THEME_CODE_PREFIX}${THEME_FORMAT_VERSION}:${toBase64Url(JSON.stringify(payload))}`;
    }

    /* Returns { settings, name, version, skipped, newer } or throws
       an Error with a friendly message */
    function decodeThemeCode(code) {
        const cleaned = String(code || "").replace(/\s+/g, "");
        const match = cleaned.match(/^FMTHEME(\d+):([A-Za-z0-9_-]+)$/);

        if (!match) {
            throw new Error("That doesn't look like a theme code.");
        }

        let payload;

        try {
            payload = JSON.parse(fromBase64Url(match[2]));
        } catch (error) {
            throw new Error("This theme code is damaged or incomplete.");
        }

        if (!payload || typeof payload !== "object" || typeof payload.s !== "object" || payload.s === null) {
            throw new Error("This theme code is damaged or incomplete.");
        }

        const version = Number(payload.v) || Number(match[1]) || 1;
        let raw = { ...payload.s };

        /* Old code -> run it through every upgrade step up to now */
        for (let v = version; v < THEME_FORMAT_VERSION; v++) {
            if (THEME_MIGRATIONS[v]) {
                raw = THEME_MIGRATIONS[v](raw);
            }
        }

        /* Keep only settings we know, with valid values */
        const settings = {};
        let skipped = 0;
        const byId = new Map(getThemeFields().map((f) => [f.id, f]));

        Object.keys(raw).forEach((id) => {
            const field = byId.get(id);

            if (field && isValidThemeValue(field, raw[id])) {
                settings[id] = field.type === "color" ? raw[id].toLowerCase() : raw[id];
            } else {
                skipped++;
            }
        });

        return {
            settings,
            name: typeof payload.n === "string" ? payload.n.slice(0, 40) : "",
            version,
            skipped,
            newer: version > THEME_FORMAT_VERSION
        };
    }

    /* full = true: settings not in the theme go back to default.
       full = false (presets): only the listed settings change. */
    function writeThemeSettings(settings, full) {
        getThemeFields().forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(settings, field.id)) {
                localStorage.setItem(field.ls, String(settings[field.id]));
            } else if (full) {
                localStorage.setItem(field.ls, String(field.def));
            }
        });
    }

    function saveThemeUndo() {
        localStorage.setItem(THEME_UNDO_LS, encodeThemeCode(getCurrentThemeSettings(), "Before last load"));
        localStorage.removeItem(THEME_UNDO_IMAGES_LS);   /* only set when a load changes images */
    }

    /* =========================================================
       v1.6.3: BACKGROUND IMAGES SAVED WITH YOUR THEMES
       Saved themes (My Themes) can keep a copy of your background
       images, so loading a theme brings its pictures back. Each
       picture is stored once ("lib:<fingerprint>" in the background
       image database), however many themes use it. Theme codes
       still never carry images. Everything stays on this computer.
       ========================================================= */
    const THEME_UNDO_IMAGES_LS = "flockmodThemeUndoImages";

    async function bgLibStore(blob) {
        const hash = await crypto.subtle.digest("SHA-256", await blob.arrayBuffer());
        const id = "lib:" + [...new Uint8Array(hash)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
        const has = await bgDB("readonly", (s) => s.count(id)).catch(() => 0);

        if (!has) {
            await bgDB("readwrite", (s) => s.put(blob, id));
        }

        return id;
    }

    /* { sidebar: "lib:..." | null, chat: ..., ... } for what's showing now */
    async function snapshotBgImages() {
        const images = {};

        for (const place of BACKGROUND_PLACES) {
            const blob = await getBgBlob(place.key);
            images[place.key] = blob ? await bgLibStore(blob) : null;
        }

        return images;
    }

    async function restoreBgImages(images) {
        for (const place of BACKGROUND_PLACES) {
            if (!(place.key in images)) {
                continue;
            }

            const id = images[place.key];
            const blob = id ? await bgDB("readonly", (s) => s.get(id)).catch(() => null) : null;
            await setBgBlob(place.key, blob || null);
        }
    }

    /* Removes stored pictures no saved theme (or Undo) uses anymore */
    async function cleanBgLibrary() {
        const used = new Set();
        getSavedThemes().forEach((t) => Object.values(t.images || {}).forEach((id) => id && used.add(id)));

        try {
            Object.values(JSON.parse(localStorage.getItem(THEME_UNDO_IMAGES_LS) || "{}")).forEach((id) => id && used.add(id));
        } catch (error) { /* ignore */ }

        const keys = await bgDB("readonly", (s) => s.getAllKeys()).catch(() => []);
        const stale = (keys || []).filter((k) => typeof k === "string" && k.startsWith("lib:") && !used.has(k));

        if (stale.length) {
            await bgDB("readwrite", (s) => { stale.forEach((k) => s.delete(k)); return null; }).catch(() => {});
        }
    }

    /* =========================================================
       v1.6.3: SOUNDS SAVED WITH YOUR THEMES
       Saved themes (My Themes) can keep your sound picks (which sound
       each event plays, on/off and its volume), so loading a theme
       brings its sounds back. Your main Sounds switch, main volume and
       keywords stay yours. Uploaded sound files are kept as long as a
       saved theme uses them, even if you remove them from your list;
       loading that theme puts them back in it. Theme codes never carry
       sounds. Everything stays on this computer.
       ========================================================= */
    const THEME_UNDO_SOUNDS_LS = "flockmodThemeUndoSounds";

    function snapshotThemeSounds() {
        const events = readSavedSoundSettings().events;
        const lib = getSoundLibrary();
        const ids = new Set(Object.values(events)
            .map((e) => e.sound)
            .filter((v) => v.startsWith("upload:"))
            .map((v) => v.slice(7)));
        return { events, files: lib.filter((f) => ids.has(f.id)) };
    }

    async function restoreThemeSounds(snap) {
        if (!snap || typeof snap.events !== "object") return;

        /* uploaded files this theme uses: back in your list if still stored */
        const lib = getSoundLibrary();
        for (const f of Array.isArray(snap.files) ? snap.files : []) {
            if (!f || typeof f.id !== "string" || lib.some((s) => s.id === f.id)) continue;
            const has = await soundDB("readonly", (st) => st.count(f.id)).catch(() => 0);
            if (has) lib.push({ id: f.id, name: String(f.name || "My sound").slice(0, 40) });
        }
        setSoundLibrary(lib);

        const st = readSavedSoundSettings();
        SOUND_EVENTS.forEach((ev) => {
            const e = snap.events[ev.key];
            if (!e) return;
            st.events[ev.key] = {
                enabled: Boolean(e.enabled),
                sound: isValidSoundValue(e.sound) ? e.sound : ev.def.sound,
                volume: clampVolume(Number(e.volume), ev.def.volume)
            };
        });
        writeSoundSettings(st);
        applySavedSounds();
    }

    /* Uploaded sound ids a saved theme (or Undo) still needs */
    function themeSoundIdsInUse() {
        const used = new Set();
        const add = (snap) => (snap?.files || []).forEach((f) => f && f.id && used.add(f.id));
        getSavedThemes().forEach((t) => add(t.sounds));
        try { add(JSON.parse(localStorage.getItem(THEME_UNDO_SOUNDS_LS) || "null")); } catch (error) { /* ignore */ }
        return used;
    }

    /* Removes stored sound files nothing uses anymore (not in your list, no theme) */
    async function cleanSoundFiles() {
        const keep = themeSoundIdsInUse();
        getSoundLibrary().forEach((f) => keep.add(f.id));
        const keys = await soundDB("readonly", (st) => st.getAllKeys()).catch(() => []);
        const stale = (keys || []).filter((k) => typeof k === "string" && !keep.has(k));
        if (stale.length) {
            await soundDB("readwrite", (st) => { stale.forEach((k) => st.delete(k)); return null; }).catch(() => {});
        }
    }

    function getSavedThemes() {
        try {
            const list = JSON.parse(localStorage.getItem(SAVED_THEMES_LS) || "[]");
            return Array.isArray(list)
                ? list.filter((t) => t && typeof t.name === "string" && typeof t.code === "string")
                : [];
        } catch (error) {
            return [];
        }
    }

    function setSavedThemes(list) {
        localStorage.setItem(SAVED_THEMES_LS, JSON.stringify(list));
    }

    /* Built-in presets. They only set simple coloring, so loading
       one never touches your detailed colors or Interface settings. */
    const THEME_PRESETS = [
        { name: "Midnight Violet", colors: { background: "#16121f", surface: "#241d33", accent: "#9b6bff", text: "#ece6ff", icons: "#b9a8e0" } },
        { name: "Ocean",           colors: { background: "#0d1b2a", surface: "#1b2d44", accent: "#3aa8d4", text: "#e0ecf5", icons: "#8fb1c9" } },
        { name: "Forest",          colors: { background: "#121a15", surface: "#1d2a22", accent: "#5fbf7f", text: "#e3efe6", icons: "#9bbfa6" } },
        { name: "Mocha",           colors: { background: "#1f1814", surface: "#2e241e", accent: "#d49a5a", text: "#f1e6dc", icons: "#bfa58f" } },
        { name: "Sakura",          colors: { background: "#fbeef2", surface: "#f3dbe3", accent: "#e0709a", text: "#5a3a47", icons: "#b87f94" } },
        { name: "Paper",           colors: { background: "#f4f4f2", surface: "#e4e4e1", accent: "#5b7fa6", text: "#2b2d31", icons: "#6b6f76" } },
        /* v1.6: migraine friendly. Dark but never pure black, soft text
           (never pure white), low-glare muted accent, a warm paper and
           a gentle canvas dimmer. */
        { name: "Calm Night", colors: { background: "#1d1b1a", surface: "#282523", accent: "#9a8f7e", text: "#cfc6ba", icons: "#968d84" },
          extra: {
              CanvasPaperEnabled: true, CanvasPaperColor: "#d8cfc0",
              CanvasAreaEnabled: true, CanvasAreaColor: "#1d1b1a",
              CanvasDimEnabled: true, CanvasDimColor: "#1c1612", CanvasDimStrength: 20
          },
          note: "Soft dark colors, a warm paper and a gentle canvas dimmer. Easy on the eyes." }
    ];

    function presetToSettings(preset) {
        const settings = { SimpleColoringEnabled: true };

        SIMPLE_COLOR_SETTINGS.forEach((setting) => {
            const color = preset.colors[setting.key];
            const enabledId = setting.lsEnabled.replace(/^flockmod(Custom)?/, "");
            const colorId = setting.lsColor.replace(/^flockmod(Custom)?/, "");

            settings[enabledId] = Boolean(color);

            if (color) {
                settings[colorId] = color;
            }
        });

        return Object.assign(settings, preset.extra || {});
    }

    function escapeHTML(text) {
        return String(text).replace(/[&<>"']/g, (c) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    function buildPresetCardsHTML() {
        return THEME_PRESETS.map((preset, index) => `
            <div class="themeModPresetCard">
                <div class="themeModPresetSwatches">
                    ${["background", "surface", "accent", "text", "icons"].map((key) =>
                        `<span style="background-color: ${preset.colors[key]}"></span>`
                    ).join("")}
                </div>
                <div class="themeModPresetName">${escapeHTML(preset.name)}</div>
                <button type="button" class="themeModButton themeModPresetApply" data-preset-index="${index}">
                    Use
                </button>
            </div>
        `).join("");
    }

    async function copyText(text, fallbackField) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            if (fallbackField) {
                fallbackField.value = text;
                fallbackField.select();
                try {
                    return document.execCommand("copy");
                } catch (e) {
                    return false;
                }
            }
            return false;
        }
    }

    /* Re-creates the open menu (same spot and size) so every input
       shows the newly loaded values, then returns to a section. */
    function reopenModMenu(section) {
        const old = document.querySelector(MOD_DIALOG_SELECTOR);
        const keep = old
            ? { left: old.style.left, top: old.style.top, width: old.style.width, height: old.style.height }
            : null;

        if (old) {
            old.remove();
        }

        const dialog = createModMenu();

        if (!dialog) {
            return null;
        }

        if (keep) {
            Object.assign(dialog.style, keep);
        }

        const button = dialog.querySelector(`.themeModSidebarItem[data-theme-section="${section}"]`);

        if (button) {
            button.click();
        }

        return dialog;
    }

    function setupThemesPanel(dialog) {
        const panel = dialog.querySelector('[data-theme-panel="themes"]');

        if (!panel) {
            return;
        }

        const status = panel.querySelector(".themeModThemeStatus");
        const exportBox = panel.querySelector(".themeModExportCode");
        const importBox = panel.querySelector(".themeModImportCode");
        const saveName = panel.querySelector(".themeModSaveName");
        const savedList = panel.querySelector(".themeModSavedList");
        const undoRow = panel.querySelector(".themeModUndoRow");

        function showStatus(message, kind = "ok") {
            status.textContent = message;
            status.dataset.kind = kind;
            status.style.display = message ? "block" : "none";
        }

        /* Stays visible after the menu reopens */
        function flash(section, message, kind) {
            const reopened = reopenModMenu(section);
            const newStatus = reopened && reopened.querySelector(".themeModThemeStatus");

            if (newStatus) {
                newStatus.textContent = message;
                newStatus.dataset.kind = kind || "ok";
                newStatus.style.display = "block";
            }

            return reopened;
        }

        async function loadTheme(settings, full, message, images, sounds) {
            saveThemeUndo();

            /* v1.6.3: a saved theme with sounds swaps them in (Undo brings yours back) */
            if (sounds) {
                try {
                    localStorage.setItem(THEME_UNDO_SOUNDS_LS, JSON.stringify(snapshotThemeSounds()));
                    await restoreThemeSounds(sounds);
                } catch (error) {
                    /* sounds couldn't be loaded: colors still load */
                }
            } else {
                localStorage.removeItem(THEME_UNDO_SOUNDS_LS);
            }

            /* v1.6.3: a saved theme with pictures swaps them in (Undo can bring yours back) */
            if (images) {
                try {
                    localStorage.setItem(THEME_UNDO_IMAGES_LS, JSON.stringify(await snapshotBgImages()));
                    await restoreBgImages(images);
                } catch (error) {
                    /* pictures couldn't be loaded: colors still load */
                }
            }

            writeThemeSettings(settings, full);
            loadSavedCustomizations();
            const reopened = flash("themes", message);
            /* v1.6.2: the Undo row glows for a moment so it's hard to miss */
            reopened?.querySelector(".themeModUndoRow")?.classList.add("fmUndoFresh");
            playThemeShimmer(document.querySelector(MOD_DIALOG_SELECTOR));
        }

        undoRow.style.display = localStorage.getItem(THEME_UNDO_LS) ? "" : "none";

        /* ---- Export ---- */
        panel.querySelector(".themeModExportButton").addEventListener("click", async () => {
            const code = encodeThemeCode(getCurrentThemeSettings());
            exportBox.value = code;
            exportBox.style.display = "block";

            const copied = await copyText(code, exportBox);
            showStatus(copied
                ? "Theme code copied! Paste it anywhere to share it."
                : "Here's your code, select it and copy it with Ctrl+C.");
        });

        /* ---- Import ---- */
        panel.querySelector(".themeModImportButton").addEventListener("click", () => {
            let result;

            try {
                result = decodeThemeCode(importBox.value);
            } catch (error) {
                showStatus(error.message, "error");
                return;
            }

            let message = result.name
                ? `Imported "${result.name}".`
                : "Theme imported.";

            if (result.newer) {
                message += " It was made with a newer version of the mod, so update to see all of it.";
            } else if (result.skipped) {
                message += ` ${result.skipped} unknown setting(s) were skipped.`;
            }

            /* Fonts that came with the code */
            const font = result.settings.UIFont;

            if (font && font.startsWith("google:")) {
                setFontLibrary([...getFontLibrary(), font]);
            } else if (font && font.startsWith("upload:") && !getFontLibrary().includes(font)) {
                message += ` It uses an uploaded font ("${fontValueLabel(font)}") you don't have, so the default font is shown until you upload it.`;
            }

            loadTheme(result.settings, true, message);
        });

        /* ---- Undo ---- */
        panel.querySelector(".themeModUndoButton").addEventListener("click", async () => {
            const code = localStorage.getItem(THEME_UNDO_LS);

            if (!code) {
                return;
            }

            try {
                const result = decodeThemeCode(code);
                localStorage.removeItem(THEME_UNDO_LS);

                /* v1.6.3: put your pictures back too, if the last load changed them */
                const undoImages = localStorage.getItem(THEME_UNDO_IMAGES_LS);

                if (undoImages) {
                    try {
                        await restoreBgImages(JSON.parse(undoImages));
                    } catch (error) { /* keep going */ }

                    localStorage.removeItem(THEME_UNDO_IMAGES_LS);
                    cleanBgLibrary();
                }

                /* v1.6.3: and your sounds, if the last load changed them */
                const undoSounds = localStorage.getItem(THEME_UNDO_SOUNDS_LS);

                if (undoSounds) {
                    try {
                        await restoreThemeSounds(JSON.parse(undoSounds));
                    } catch (error) { /* keep going */ }

                    localStorage.removeItem(THEME_UNDO_SOUNDS_LS);
                    cleanSoundFiles();
                }

                writeThemeSettings(result.settings, true);
                loadSavedCustomizations();
                flash("themes", "Went back to your theme from before the last load.");
                playThemeShimmer(document.querySelector(MOD_DIALOG_SELECTOR));
            } catch (error) {
                showStatus("Couldn't undo, the backup was damaged.", "error");
            }
        });

        /* ---- My Themes ---- */
        function renderSavedList() {
            const themes = getSavedThemes();

            if (!themes.length) {
                savedList.innerHTML = `<div class="themeModSavedEmpty">No saved themes yet. Name your current look above and save it.</div>`;
                return;
            }

            savedList.innerHTML = themes.map((theme, index) => `
                <div class="themeModSavedItem" data-index="${index}">
                    <div class="themeModSavedName">${escapeHTML(theme.name)}${theme.images && Object.values(theme.images).some(Boolean) ? ' <i class="fas fa-image themeModSavedHasImages" title="Includes background images"></i>' : ""}${theme.sounds && Object.keys(theme.sounds.events || {}).length ? ' <i class="fas fa-volume-up themeModSavedHasImages" title="Includes your sounds"></i>' : ""}</div>
                    <div class="themeModSavedButtons">
                        <button type="button" class="themeModButton" data-action="load">Load</button>
                        <button type="button" class="themeModButton" data-action="copy">Copy code</button>
                        <button type="button" class="themeModButton" data-action="rename">Rename</button>
                        <button type="button" class="themeModButton themeModDangerButton" data-action="delete">Delete</button>
                    </div>
                </div>
            `).join("");
        }

        async function saveCurrent() {
            const name = saveName.value.trim().slice(0, 40);

            if (!name) {
                showStatus("Give your theme a name first.", "error");
                return;
            }

            const code = encodeThemeCode(getCurrentThemeSettings(), name);
            const entry = { name, code };
            const withImages = panel.querySelector("#themeModSaveImages");

            /* v1.6.3: keep a copy of your background pictures with it */
            if (!withImages || withImages.checked) {
                try {
                    entry.images = await snapshotBgImages();
                } catch (error) {
                    showStatus("Couldn't copy your background images, so this theme is saved without them.", "error");
                }
            }

            /* v1.6.3: and your sound picks */
            const withSounds = panel.querySelector("#themeModSaveSounds");

            if (!withSounds || withSounds.checked) {
                try {
                    entry.sounds = snapshotThemeSounds();
                } catch (error) { /* saved without sounds */ }
            }

            const themes = getSavedThemes();
            const existing = themes.findIndex((t) => t.name.toLowerCase() === name.toLowerCase());

            if (existing >= 0) {
                themes[existing] = entry;
                showStatus(`Updated "${name}".`);
            } else {
                themes.push(entry);
                showStatus(`Saved "${name}".`);
            }

            setSavedThemes(themes);
            cleanBgLibrary();
            cleanSoundFiles();
            saveName.value = "";
            renderSavedList();
        }

        panel.querySelector(".themeModSaveButton").addEventListener("click", saveCurrent);
        saveName.addEventListener("themeModEnter", saveCurrent);

        savedList.addEventListener("click", async (event) => {
            const button = event.target.closest("button[data-action]");
            const item = event.target.closest(".themeModSavedItem");

            if (!button || !item) {
                return;
            }

            const themes = getSavedThemes();
            const index = Number(item.dataset.index);
            const theme = themes[index];

            if (!theme) {
                return;
            }

            const action = button.dataset.action;

            if (action === "load") {
                try {
                    loadTheme(decodeThemeCode(theme.code).settings, true, `Loaded "${theme.name}".`, theme.images || null, theme.sounds || null);
                } catch (error) {
                    showStatus("This saved theme is damaged and can't be loaded.", "error");
                }
            }

            if (action === "copy") {
                const copied = await copyText(theme.code, exportBox);
                if (!copied) {
                    exportBox.value = theme.code;
                    exportBox.style.display = "block";
                }
                showStatus(copied ? `Copied the code for "${theme.name}".` : "Select the code above and copy it with Ctrl+C.");
            }

            if (action === "delete") {
                /* Two clicks to delete, so it can't happen by accident */
                if (button.dataset.confirm !== "yes") {
                    button.dataset.confirm = "yes";
                    button.textContent = "Sure?";
                    setTimeout(() => {
                        if (button.isConnected) {
                            button.dataset.confirm = "";
                            button.textContent = "Delete";
                        }
                    }, 3000);
                    return;
                }

                themes.splice(index, 1);
                setSavedThemes(themes);
                cleanBgLibrary();
                cleanSoundFiles();
                renderSavedList();
                showStatus(`Deleted "${theme.name}".`);
            }

            if (action === "rename") {
                const nameEl = item.querySelector(".themeModSavedName");
                const input = document.createElement("input");
                input.type = "text";
                input.className = "themeModTextInput";
                input.value = theme.name;
                input.maxLength = 40;
                nameEl.replaceWith(input);
                input.focus();
                input.select();

                let done = false;
                const finish = (commit) => {
                    if (done) {
                        return;
                    }
                    done = true;

                    const newName = input.value.trim();

                    if (commit && newName && newName !== theme.name) {
                        const list = getSavedThemes();
                        if (list[index]) {
                            list[index].name = newName;
                            try {
                                const decoded = decodeThemeCode(list[index].code);
                                list[index].code = encodeThemeCode(decoded.settings, newName);
                            } catch (error) { /* keep the old code */ }
                            setSavedThemes(list);
                        }
                    }

                    renderSavedList();
                };

                input.addEventListener("themeModEnter", () => finish(true));
                input.addEventListener("themeModEscape", () => finish(false));
                input.addEventListener("blur", () => finish(true));
            }
        });

        /* ---- Presets ---- */
        panel.querySelectorAll(".themeModPresetApply").forEach((button) => {
            button.addEventListener("click", () => {
                const preset = THEME_PRESETS[Number(button.dataset.presetIndex)];

                if (preset) {
                    /* Background images (and see-through) sit on top of
                       the colors, so say so if any are on */
                    const root = document.documentElement;
                    const bgOn = BACKGROUND_PLACES
                        .filter((place) => root.classList.contains(place.cls))
                        .map((place) => place.label.toLowerCase());
                    const bgTip = bgOn.length
                        ? (bgOn.length === 1
                            ? ` Tip: your ${bgOn[0]} background image is still on and covers part of this look. Turn it off in Backgrounds to see it fully.`
                            : ` Tip: your ${bgOn.join(" and ")} background images are still on and cover part of this look. Turn them off in Backgrounds to see it fully.`)
                        : "";

                    loadTheme(
                        presetToSettings(preset),
                        false,
                        (preset.note
                            ? `Using "${preset.name}". ${preset.note}`
                            : `Using "${preset.name}" (simple coloring). Your detailed colors are untouched.`) + bgTip
                    );
                }
            });
        });

        renderSavedList();
    }

    function createModMenu() {
        if (document.querySelector(MOD_DIALOG_SELECTOR)) {
            return document.querySelector(MOD_DIALOG_SELECTOR);
        }

        const dialog = document.createElement("div");

        dialog.className = "dialog dialogVisible dialogFocus";
        dialog.setAttribute("name", "themeModMenu");

        Object.assign(dialog.style, {
            ...getInitialMenuRect(),
            minWidth: "400px",
            minHeight: "300px"
        });

        dialog.innerHTML = `
            <div class="themeModDialogInner">
                <div class="dialogTitlebar movable">
                    <div class="dialogTitle">
                        <div class="pull-left">
                            <i class="fas fa-palette"></i>
                            <span>Theme Mod Menu</span>
                            <span class="themeModTitleVersion">v${getModVersion()}</span>
                        </div>

                        <div class="dialogTitleButtons">
                            <div style="text-align: right;">
                                <a href="#" class="btn btn-md closeButton" title="Close">
                                    <i class="fas fa-window-close titleButton"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="themeModContent">

                    <div class="themeModSidebar">

                        <button class="themeModSidebarItem active" data-theme-section="general">
                            General
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="interface">
                            Interface
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="colors">
                            Colors
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="themes">
                            Themes
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="animations">
                            Animations
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="sounds">
                            Sounds
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="safety">
                            Safety
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="backgrounds">
                            Backgrounds
                        </button>

                        <div class="themeModSidebarFill"></div>

                    </div>

                    <div class="themeModMainColumn">

                    <div class="themeModPanel">

                        <div class="themeModPanelHeader">

                            <div class="themeModSectionTitle">
                                General
                            </div>

                            <!-- Filled in by setupJumpNavAndSearch() with one chip per subsection -->
                            <div class="themeModJumpBar"></div>

                            <button type="button" class="themeModPanelHelp" title="Quick tour of this tab" aria-label="Quick tour of this tab">
                                <i class="fas fa-info-circle"></i>
                            </button>

                            <div class="themeModSearch">
                                <button type="button" class="themeModSearchButton" title="Search settings">
                                    <i class="fas fa-search"></i>
                                </button>
                                <input type="text" class="themeModSearchInput" placeholder="Search settings..." spellcheck="false">
                            </div>

                        </div>

                        <div class="themeModSectionsScroll">

                        <div class="themeModSectionContent" data-theme-panel="general">

                            <div class="themeModSetting">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Enable customizations
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Turn your FlockMod customizations on or off.
                                    </div>
                                </div>

                                <label class="themeModToggle">

                                    <input type="checkbox" id="themeModEnabled">

                                    <span class="themeModToggleTrack">
                                        <span class="themeModToggleOption themeModToggleOff">
                                            OFF
                                        </span>

                                        <span class="themeModToggleOption themeModToggleOn">
                                            ON
                                        </span>

                                        <span class="themeModToggleThumb"></span>
                                    </span>

                                </label>

                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Options
                            </div>

                            <div class="themeModSetting">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Simple coloring
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Theme with just a few main colors. Your detailed colors are kept for later.
                                    </div>
                                </div>

                                <label class="themeModToggle">
                                    <input type="checkbox" id="themeModSimpleMode">
                                    <span class="themeModToggleTrack">
                                        <span class="themeModToggleOption themeModToggleOff">OFF</span>
                                        <span class="themeModToggleOption themeModToggleOn">ON</span>
                                        <span class="themeModToggleThumb"></span>
                                    </span>
                                </label>

                            </div>

                            <div class="themeModSetting">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Ask before closing
                                    </div>

                                    <div class="themeModSettingDescription">
                                        A reminder to apply if you close the menu with unsaved changes. Saves right away.
                                    </div>
                                </div>

                                <label class="themeModToggle">
                                    <input type="checkbox" id="themeModAskClose">
                                    <span class="themeModToggleTrack">
                                        <span class="themeModToggleOption themeModToggleOff">OFF</span>
                                        <span class="themeModToggleOption themeModToggleOn">ON</span>
                                        <span class="themeModToggleThumb"></span>
                                    </span>
                                </label>

                            </div>

                            <div class="themeModSetting">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Lite mode
                                    </div>

                                    <div class="themeModSettingDescription">
                                        For slower computers: turns off animations, background images and gradients. Your settings for them are kept. Saves right away.
                                    </div>
                                </div>

                                <label class="themeModToggle">
                                    <input type="checkbox" id="themeModLiteMode">
                                    <span class="themeModToggleTrack">
                                        <span class="themeModToggleOption themeModToggleOff">OFF</span>
                                        <span class="themeModToggleOption themeModToggleOn">ON</span>
                                        <span class="themeModToggleThumb"></span>
                                    </span>
                                </label>

                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Tour &amp; Updates
                            </div>

                            <div class="themeModSetting">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Quick tour
                                    </div>

                                    <div class="themeModSettingDescription">
                                        A short walkthrough of the basics. Show welcome brings back the first popup.
                                    </div>
                                </div>

                                <div class="themeModTourButtons">
                                    <button type="button" class="themeModButton themeModTourWelcomeButton" title="Show the welcome popup that asks if you'd like a tour">
                                        <i class="fas fa-hand-sparkles"></i> Show welcome
                                    </button>
                                    <button type="button" class="themeModButton themeModTourButton" title="Start the tour right away">
                                        <i class="fas fa-play"></i> Replay tour
                                    </button>
                                </div>

                            </div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Version
                                    </div>

                                    <div class="themeModSettingDescription">
                                        You're running FlockTheme <b>v${getModVersion()}</b>. Checking only talks to GitHub.
                                    </div>
                                </div>

                                <div class="themeModBackupButtons">
                                    <button type="button" class="themeModButton themeModWhatsNewButton">
                                        <i class="fas fa-seedling"></i> What's new
                                    </button>
                                    <button type="button" class="themeModButton themeModUpdateButton">
                                        <i class="fas fa-sync-alt"></i> Check for updates
                                    </button>
                                </div>

                            </div>

                            <div class="themeModUpdateStatus" style="display: none;"></div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Check for updates automatically
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Once a day at most. A pink dot on the flower button means an update is out.
                                    </div>
                                </div>

                                <label class="themeModToggle">
                                    <input type="checkbox" id="themeModAutoUpdate">
                                    <span class="themeModToggleTrack">
                                        <span class="themeModToggleOption themeModToggleOff">OFF</span>
                                        <span class="themeModToggleOption themeModToggleOn">ON</span>
                                        <span class="themeModToggleThumb"></span>
                                    </span>
                                </label>

                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Backup
                            </div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Full backup file
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Saves everything (themes, settings, images, sounds, fonts) to one file you can load on another computer.
                                    </div>
                                </div>

                                <div class="themeModBackupButtons">
                                    <button type="button" class="themeModButton themeModBackupSave">
                                        <i class="fas fa-download"></i> Save backup
                                    </button>
                                    <button type="button" class="themeModButton themeModBackupLoad">
                                        <i class="fas fa-upload"></i> Load backup
                                    </button>
                                    <input type="file" class="themeModBackupFile" accept=".json,application/json" style="display: none;">
                                </div>

                            </div>

                            <div class="themeModBackupStatus" style="display: none;"></div>

                            <div class="themeModLocalNote">
                                <i class="fas fa-circle-info"></i>
                                <span>The backup file stays on your computer. Nothing is uploaded. Loading one replaces everything the mod has saved in this browser.</span>
                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Help
                            </div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Links
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Get the latest version, read the instructions, or let me, <span class="themeModCreatorName">nene2nd</span>, know about a bug.
                                    </div>
                                </div>

                                <div class="themeModBackupButtons">
                                    <a class="themeModButton themeModLinkButton" href="${UPDATE_REPO ? `https://github.com/${UPDATE_REPO}` : "#"}" target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-github"></i> GitHub page
                                    </a>
                                    <a class="themeModButton themeModLinkButton" href="${UPDATE_REPO ? bugReportURL() : "#"}" target="_blank" rel="noopener noreferrer">
                                        <i class="fas fa-bug"></i> Report a bug
                                    </a>
                                </div>

                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection fmNoCard">
                                Thank You
                            </div>

                            <div class="themeModThanks">
                                <span class="themeModThanksFlower" aria-hidden="true"></span>
                                <span class="themeModThanksPetal themeModThanksPetal1" aria-hidden="true"></span>
                                <span class="themeModThanksPetal themeModThanksPetal2" aria-hidden="true"></span>
                                <span class="themeModThanksPetal themeModThanksPetal3" aria-hidden="true"></span>
                                <p>
                                    I have full respect for the original creators of FlockMod, which is
                                    <span class="themeModCreatorName">FDT</span> and
                                    <span class="themeModCreatorName">auto</span>.
                                    Thank you to everyone who gave me valuable ideas and advice, I hope you enjoy this mod!
                                </p>
                                <p class="themeModThanksSign">&ndash; <span class="themeModCreatorName">nene2nd</span></p>
                            </div>

                        </div>

                        <div class="themeModSectionContent" data-theme-panel="interface">

                            <div class="themeModSubsectionTitle">
                                Font
                            </div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        UI Font
                                    </div>

                                    <div class="themeModSettingDescription">
                                        The font FlockMod uses.
                                    </div>
                                </div>

                                <!-- Options are filled in by buildFontOptionsHTML() -->
                                <select id="themeModUIFont" class="themeModSelect" data-default="default"></select>

                            </div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Add a custom font
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Type a font name from fonts.google.com, or upload a font file.
                                    </div>
                                </div>

                                <div class="themeModFontAddControls">
                                    <div class="themeModSaveRow">
                                        <input type="text" class="themeModTextInput themeModGoogleFontName" placeholder="e.g. Poppins" maxlength="40" spellcheck="false">
                                        <button type="button" class="themeModButton themeModGoogleFontAdd">Add</button>
                                    </div>
                                    <button type="button" class="themeModButton themeModFontUpload">
                                        <i class="fas fa-upload"></i> Upload font file
                                    </button>
                                    <input type="file" class="themeModFontFile" accept=".ttf,.otf,.woff,.woff2" style="display: none;">
                                </div>

                            </div>

                            <div class="themeModFontStatus" style="display: none;"></div>

                            <div class="themeModFontList"></div>

                            <div class="themeModLocalNote">
                                <i class="fas fa-circle-info"></i>
                                <span>Uploaded fonts stay in this browser only. Nobody else sees them.</span>
                            </div>


                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        UI Font Size
                                    </div>

                                    <div class="themeModSettingDescription">
                                        How big FlockMod's text is.
                                    </div>
                                </div>

                                <div class="themeModRangeControl">
                                    <input
                                        type="range"
                                        id="themeModUIFontSize"
                                        class="themeModRange"
                                        min="90"
                                        max="110"
                                        step="1"
                                        value="100"
                                    >

                                    <span
                                        id="themeModUIFontSizeValue"
                                        class="themeModRangeValue"
                                    >
                                        100%
                                    </span>
                                </div>

                            </div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        UI Font Weight
                                    </div>

                                    <div class="themeModSettingDescription">
                                        How bold FlockMod's text is.
                                    </div>
                                </div>

                                <select id="themeModUIFontWeight" class="themeModSelect">
                                    <option value="regular">Regular</option>
                                    <option value="medium">Medium</option>
                                    <option value="semibold">Semibold</option>
                                    <option value="bold">Bold</option>
                                </select>

                            </div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
    Spacing
</div>

<div class="themeModSetting">

    <div class="themeModSettingText">
        <div class="themeModSettingName">
            UI Spacing
        </div>

        <div class="themeModSettingDescription">
            How roomy or compact FlockMod looks.
        </div>
    </div>

    <div class="themeModRangeControl">
        <input
            type="range"
            id="themeModUISpacing"
            class="themeModRange"
            min="75"
            max="125"
            step="1"
            value="100"
        >

        <span
            id="themeModUISpacingValue"
            class="themeModRangeValue"
        >
            100%
        </span>
    </div>

</div>

<div class="themeModSetting themeModNoDivider">

    <div class="themeModSettingText">
        <div class="themeModSettingName">
            Border Radius
        </div>

        <div class="themeModSettingDescription">
            How round corners are. 5 = FlockMod's own.
        </div>
    </div>

    <div class="themeModRangeControl">
        <input
            type="range"
            id="themeModUIRadius"
            class="themeModRange"
            min="0"
            max="12"
            step="1"
            value="5"
        >

        <span
            id="themeModUIRadiusValue"
            class="themeModRangeValue"
        >
            Default
        </span>
    </div>

</div>

<div class="themeModSubsectionTitle themeModSpacingSubsection">
    Slider Thumbs
</div>

<div class="themeModSetting themeModNoDivider">

    <div class="themeModSettingText">
        <div class="themeModSettingName">
            Custom Thumb Shape
        </div>

        <div class="themeModSettingDescription">
            Turns slider and switch thumbs into shapes like hearts, stars or cats.
        </div>
    </div>

    <label class="themeModToggle" style="margin-right: 10px;">
        <input type="checkbox" id="themeModThumbShapeEnabled">
        <span class="themeModToggleTrack">
            <span class="themeModToggleOption themeModToggleOff">OFF</span>
            <span class="themeModToggleOption themeModToggleOn">ON</span>
            <span class="themeModToggleThumb"></span>
        </span>
    </label>

    <select id="themeModThumbShape" class="themeModSelect themeModThumbSelect" data-default="heart">
        ${buildThumbShapeOptionsHTML()}
    </select>

    <span class="themeModThumbPreview" title="Preview"></span>

</div>

<div class="themeModSetting themeModNoDivider">

    <div class="themeModSettingText">
        <div class="themeModSettingName">
            Shape Size
        </div>

        <div class="themeModSettingDescription">
            Makes shaped thumbs bigger.
        </div>
    </div>

    <div class="themeModRangeControl">
        <input type="range" id="themeModThumbShapeSize" class="themeModRange" min="100" max="150" step="5" value="100">
        <span id="themeModThumbShapeSizeValue" class="themeModRangeValue">100%</span>
    </div>

</div>

${buildDecoRowsHTML()}

${buildBubbleRowsHTML()}

${buildChatHighlightRowsHTML()}

${buildChatNotifRowsHTML()}

${buildClockRowsHTML()}

        </div>

                        <div
                            class="themeModSectionContent"
                            data-theme-panel="colors"
                        >

    <div class="themeModSimpleColors">

        <div class="themeModSubsectionTitle">
            Simple Colors
        </div>

        ${buildSimpleColorRowsHTML()}

    </div>

    <div class="themeModDetailedColors">

    <div class="themeModLocalNote" title="Some colors have a Gradient option. It only shows while that color is ON, and only in detailed mode (Simple coloring turns gradients off). Sidebar gradients stretch across the whole sidebar instead of restarting in each section. A background image sits on top of the gradient and covers it (the gradient only shows through see-through parts of the image), and sidebar sections drop their gradient while the sidebar image is see-through, so the image still shows through them. Slider fills and switches use Accent 1's gradient too.">
        <i class="fas fa-circle-info"></i>
        <span>Click a section title to fold it. Gradient buttons only work in detailed mode. Hover here for more about gradients.</span>
    </div>

    <div class="themeModSubsectionTitle">
        General
    </div>

    <div class="themeModSetting themeModNoDivider">

        <div class="themeModSettingText">
            <div class="themeModSettingName">
                Text Color 1
            </div>

            <div class="themeModSettingDescription">
                Headings and section titles.
            </div>
        </div>

        <label class="themeModToggle" style="margin-right: 10px;">
            <input type="checkbox" id="themeModText1ColorEnabled">
            <span class="themeModToggleTrack">
                <span class="themeModToggleOption themeModToggleOff">OFF</span>
                <span class="themeModToggleOption themeModToggleOn">ON</span>
                <span class="themeModToggleThumb"></span>
            </span>
        </label>

        <input type="color" id="themeModUIText1Color" value="#ffffff">

    </div>

    <div class="themeModSetting themeModNoDivider">

        <div class="themeModSettingText">
            <div class="themeModSettingName">
                Text Color 2
            </div>

            <div class="themeModSettingDescription">
                Most other text. Chat, usernames and the FlockMod title aren't changed.
            </div>
        </div>

        <label class="themeModToggle" style="margin-right: 10px;">
            <input type="checkbox" id="themeModText2ColorEnabled">
            <span class="themeModToggleTrack">
                <span class="themeModToggleOption themeModToggleOff">OFF</span>
                <span class="themeModToggleOption themeModToggleOn">ON</span>
                <span class="themeModToggleThumb"></span>
            </span>
        </label>

        <input type="color" id="themeModUIText2Color" value="#ffffff">

    </div>

    <div class="themeModSetting themeModNoDivider">

        <div class="themeModSettingText">
            <div class="themeModSettingName">
                Selected Colors
            </div>

            <div class="themeModSettingDescription">
                Selected layers, tools and rows. OFF = FlockMod's look.
            </div>
        </div>

        <label class="themeModToggle" style="margin-right: 10px;">
            <input type="checkbox" id="themeModSelectedColorEnabled" data-default="true">
            <span class="themeModToggleTrack">
                <span class="themeModToggleOption themeModToggleOff">OFF</span>
                <span class="themeModToggleOption themeModToggleOn">ON</span>
                <span class="themeModToggleThumb"></span>
            </span>
        </label>

        <input type="color" id="themeModUISelectedColor" value="#4f5156">

    </div>

    <div class="themeModSetting themeModNoDivider">

        <div class="themeModSettingText">
            <div class="themeModSettingName">
                Hover Colors
            </div>

            <div class="themeModSettingDescription">
                Hover states everywhere. OFF = FlockMod's look.
            </div>
        </div>

        <label class="themeModToggle" style="margin-right: 10px;">
            <input type="checkbox" id="themeModHoverColorEnabled" data-default="true">
            <span class="themeModToggleTrack">
                <span class="themeModToggleOption themeModToggleOff">OFF</span>
                <span class="themeModToggleOption themeModToggleOn">ON</span>
                <span class="themeModToggleThumb"></span>
            </span>
        </label>

        <input type="color" id="themeModUIHoverColor" value="#4f5156">

    </div>

        <div class="themeModSubsectionTitle themeModSpacingSubsection">
        Sidebar
    </div>

    ${buildSidebarColorRowsHTML()}

    <div class="themeModSubsectionTitle themeModSpacingSubsection">
        Top Bar
    </div>

        ${buildTopBarColorRowsHTML()}

    <div class="themeModSubsectionTitle themeModSpacingSubsection">
        Bottom Bar
    </div>

    ${buildBottomBarColorRowsHTML()}

    <div class="themeModSubsectionTitle themeModSpacingSubsection">
        Popups &amp; Menus
    </div>

    ${buildSidebarColorRowsHTML(POPUP_COLOR_SETTINGS)}

    <div class="themeModSubsectionTitle themeModSpacingSubsection">
        Chat
    </div>

    ${buildSidebarColorRowsHTML(CHAT_COLOR_SETTINGS)}

    <div class="themeModSubsectionTitle themeModSpacingSubsection">
        Chat Notifications
    </div>

    ${buildSidebarColorRowsHTML(CHATNOTIF_COLOR_SETTINGS)}

    </div><!-- closes themeModDetailedColors -->

    <!-- v1.6: Canvas stays visible in simple AND detailed coloring -->
    <div class="themeModSubsectionTitle themeModSpacingSubsection">
        Canvas
    </div>

    ${buildCanvasRowsHTML()}

</div>

                        <div class="themeModSectionContent" data-theme-panel="themes">

                            <div class="themeModThemeStatus" style="display: none;"></div>

                            <div class="themeModUndoRow" style="display: none;">
                                <span><i class="fas fa-undo-alt"></i> Changed your mind about the last theme you loaded?</span>
                                <button type="button" class="themeModButton themeModUndoButton">Undo</button>
                            </div>

                            <div class="themeModSubsectionTitle">
                                Share
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Export theme</div>
                                    <div class="themeModSettingDescription">
                                        Copy a code of your look to share with friends.
                                    </div>
                                </div>
                                <button type="button" class="themeModButton themeModExportButton">Copy code</button>
                            </div>

                            <textarea class="themeModCodeBox themeModExportCode" readonly style="display: none;"></textarea>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Import theme</div>
                                    <div class="themeModSettingDescription">
                                        Paste a code below to use it. You can undo.
                                    </div>
                                </div>
                                <button type="button" class="themeModButton themeModImportButton">Import</button>
                            </div>

                            <textarea class="themeModCodeBox themeModImportCode" placeholder="FMTHEME1:..." spellcheck="false"></textarea>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                My Themes
                            </div>

                            <div class="themeModSetting themeModNoDivider">
                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">Save current theme</div>
                                    <div class="themeModSettingDescription">
                                        Saving with an existing name updates that theme.
                                    </div>
                                </div>
                                <div class="themeModSaveRow">
                                    <input type="text" class="themeModTextInput themeModSaveName" placeholder="Theme name" maxlength="40" spellcheck="false">
                                    <button type="button" class="themeModButton themeModSaveButton">Save</button>
                                </div>
                            </div>

                            <label class="themeModSaveImagesRow">
                                <input type="checkbox" id="themeModSaveImages" checked>
                                Include my background images (kept on this computer, not in theme codes)
                            </label>

                            <label class="themeModSaveImagesRow">
                                <input type="checkbox" id="themeModSaveSounds" checked>
                                Include my sounds (kept on this computer, not in theme codes)
                            </label>

                            <div class="themeModSavedList"></div>

                            <div class="themeModSubsectionTitle themeModSpacingSubsection">
                                Presets
                            </div>

                            <div class="themeModSettingDescription themeModPresetNote">
                                Presets set your simple colors (Calm Night also sets the canvas).
                                Background images stay on top of them, so turn those off in Backgrounds to see a preset fully.
                            </div>

                            <div class="themeModPresetGrid">
                                ${buildPresetCardsHTML()}
                            </div>

                        </div>

${buildAnimationsPanelHTML()}

${buildSoundsPanelHTML()}

${buildSafetyPanelHTML()}

                        <div class="themeModSectionContent" data-theme-panel="backgrounds">

                            <div class="themeModLocalNote">
                                <i class="fas fa-circle-info"></i>
                                <span>Images stay in this browser only. Nobody else sees them, and they aren't in share codes.</span>
                            </div>

                            ${buildBackgroundRowsHTML()}

                        </div>

                        </div><!-- closes themeModSectionsScroll -->

                    </div><!-- closes themeModPanel -->

                    <div class="themeModActions">

                        <!-- Only shown in Colors while simple mode is on (see CSS) -->
                        <button type="button" class="themeModCopyToDetailed" title="Turn your simple colors into detailed ones, so you can fine-tune them">
                            <i class="fas fa-layer-group"></i> Copy to detailed
                        </button>

                        <span class="themeModActionsNote"></span>

                        <button type="button" class="themeModResetButton" title="Resets every page of the mod to default (saved themes are kept)">
                            <i class="fas fa-undo-alt"></i> Reset all
                        </button>

                        <button type="button" class="themeModApplyButton">
                            Apply Changes
                        </button>

                    </div>

                    </div><!-- closes themeModMainColumn -->

                </div><!-- closes themeModContent -->

            </div>

            <div class="dialogSize dsBar sbTop"></div>
            <div class="dialogSize dsBar sbBottom"></div>
            <div class="dialogSize dsBar sbLeft"></div>
            <div class="dialogSize dsBar sbRight"></div>

            <div class="dialogSize dsCorner sbTopLeft"></div>
            <div class="dialogSize dsCorner sbTopRight"></div>
            <div class="dialogSize dsCorner sbBottomLeft"></div>
            <div class="dialogSize dsCorner sbBottomRight"></div>
        `;

        const dialogContainer =
            document.querySelector("#dialogContainer");

        if (!dialogContainer) {
            return null;
        }

        /* No backdrop anymore: the rest of FlockMod stays clickable
           while the menu is open, so you can open popups/chat and
           see your colors live. (The close code still removes any
           old .themeModBackdrop, which is harmless.) */
        dialogContainer.appendChild(dialog);

        setupDragging(dialog);
        setupResizing(dialog);
        setupCloseButton(dialog);
        setupSidebarNavigation(dialog);
        setupJumpNavAndSearch(dialog);
        setupThemesPanel(dialog);
        setupBackgroundsPanel(dialog);
        setupThumbShape(dialog);
        setupChatHighlight(dialog);
        setupChatNotif(dialog);
        setupClockPanel(dialog);
        setupCanvasDimmer(dialog);

        const enabledToggle =
            dialog.querySelector("#themeModEnabled");

        const savedState =
            localStorage.getItem(
                "flockmodCustomizationsEnabled"
            );

        if (savedState !== null) {
            customizationsEnabled =
                savedState === "true";
        }

        enabledToggle.checked =
            customizationsEnabled;

        enabledToggle.addEventListener("change", () => {
            customizationsEnabled =
                enabledToggle.checked;

            localStorage.setItem(
                "flockmodCustomizationsEnabled",
                customizationsEnabled
            );

            document.documentElement.classList.toggle(
                "flockmodCustomizationsDisabled",
                !customizationsEnabled
            );

            if (customizationsEnabled) {
                applySavedFont();
                applySavedFontSize();
                applySavedFontWeight();
                applySavedSpacing();
            } else {
                document.documentElement.style.removeProperty(
                    "--flockmod-custom-ui-font"
                );

                document.documentElement.style.removeProperty(
                    "--flockmod-custom-ui-font-size"
                );

                document.documentElement.style.removeProperty(
                    "--flockmod-custom-ui-font-weight"
                );

                document.documentElement.style.removeProperty(
                    "--flockmod-ui-spacing"
                );
            }
        });

        const fontSelect =
            dialog.querySelector("#themeModUIFont");

        const savedFont =
            localStorage.getItem("flockmodCustomUIFont") ||
            "default";

        fontSelect.innerHTML =
            buildFontOptionsHTML(savedFont);

        fontSelect.value =
            isValidFontValue(savedFont) ? savedFont : "default";

        if (customizationsEnabled) {
            applyFontValue(savedFont);
        }

        setupCustomFonts(dialog, fontSelect);

        const fontSizeSlider =
            dialog.querySelector("#themeModUIFontSize");

        const fontSizeValue =
            dialog.querySelector("#themeModUIFontSizeValue");

        const savedFontSize =
            localStorage.getItem(
                "flockmodCustomUIFontSize"
            ) || "100";

        fontSizeSlider.value =
            savedFontSize;

        fontSizeValue.textContent =
            `${savedFontSize}%`;

        if (customizationsEnabled) {
            applyFontSizePreview(
                savedFontSize
            );
        }

        const fontWeightSelect =
            dialog.querySelector("#themeModUIFontWeight");

        const savedFontWeight =
            localStorage.getItem(
                "flockmodCustomUIFontWeight"
            ) || "regular";

        fontWeightSelect.value =
            savedFontWeight;

        if (customizationsEnabled) {
            applyFontWeightPreview(
                savedFontWeight
            );
        }

        const spacingSlider =
            dialog.querySelector("#themeModUISpacing");

        const spacingValue =
            dialog.querySelector("#themeModUISpacingValue");

        const savedSpacing =
            localStorage.getItem(
                "flockmodCustomUISpacing"
            ) || "100";

        spacingSlider.value =
            savedSpacing;

        spacingValue.textContent =
            `${savedSpacing}%`;

        if (customizationsEnabled) {
            applySpacingPreview(
                savedSpacing
            );
        }

        const radiusSlider =
            dialog.querySelector("#themeModUIRadius");

        const radiusValue =
            dialog.querySelector("#themeModUIRadiusValue");

        const savedRadius =
             localStorage.getItem(
                "flockmodCustomUIRadius"
        ) || "5";

radiusSlider.value =
    savedRadius;

radiusValue.textContent =
    radiusLabel(savedRadius);

if (customizationsEnabled) {
    applyRadiusPreview(
        savedRadius
    );
}

const selectedColorInput =
    dialog.querySelector("#themeModUISelectedColor");

const savedSelectedColor =
    localStorage.getItem("flockmodCustomSelectedColor") || "#4f5156";

selectedColorInput.value = savedSelectedColor;

if (customizationsEnabled) {
    applySelectedColorPreview(savedSelectedColor);
}

selectedColorInput.addEventListener("input", () => {
    applySelectedColorPreview(selectedColorInput.value);
});

const hoverColorInput =
    dialog.querySelector("#themeModUIHoverColor");

const savedHoverColor =
    localStorage.getItem("flockmodCustomHoverColor") || "#4f5156";

hoverColorInput.value = savedHoverColor;

if (customizationsEnabled) {
    applyHoverColorPreview(savedHoverColor);
}

hoverColorInput.addEventListener("input", () => {
    applyHoverColorPreview(hoverColorInput.value);
});

const selectedColorEnabledToggle =
    dialog.querySelector("#themeModSelectedColorEnabled");

const hoverColorEnabledToggle =
    dialog.querySelector("#themeModHoverColorEnabled");

selectedColorEnabledToggle.checked =
    isSavedOnByDefault("flockmodCustomSelectedColorEnabled");

hoverColorEnabledToggle.checked =
    isSavedOnByDefault("flockmodCustomHoverColorEnabled");

applySelectedEnabledPreview(selectedColorEnabledToggle.checked);
applyHoverEnabledPreview(hoverColorEnabledToggle.checked);

selectedColorEnabledToggle.addEventListener("change", () => {
    applySelectedEnabledPreview(selectedColorEnabledToggle.checked);
});

hoverColorEnabledToggle.addEventListener("change", () => {
    applyHoverEnabledPreview(hoverColorEnabledToggle.checked);
});

const text1ColorEnabledToggle =
    dialog.querySelector("#themeModText1ColorEnabled");

const text1ColorInput =
    dialog.querySelector("#themeModUIText1Color");

const savedText1Enabled =
    localStorage.getItem("flockmodCustomText1ColorEnabled") === "true";

const savedText1Color =
    localStorage.getItem("flockmodCustomText1Color") || "#ffffff";

text1ColorEnabledToggle.checked = savedText1Enabled;
text1ColorInput.value = savedText1Color;

if (customizationsEnabled) {
    applyText1ColorEnabledPreview(savedText1Enabled);
    applyText1ColorPreview(savedText1Color);
}

text1ColorEnabledToggle.addEventListener("change", () => {
    applyText1ColorEnabledPreview(text1ColorEnabledToggle.checked);
});

text1ColorInput.addEventListener("input", () => {
    applyText1ColorPreview(text1ColorInput.value);
});

const text2ColorEnabledToggle =
    dialog.querySelector("#themeModText2ColorEnabled");

const text2ColorInput =
    dialog.querySelector("#themeModUIText2Color");

const savedText2Enabled =
    localStorage.getItem("flockmodCustomText2ColorEnabled") === "true";

const savedText2Color =
    localStorage.getItem("flockmodCustomText2Color") || "#ffffff";

text2ColorEnabledToggle.checked = savedText2Enabled;
text2ColorInput.value = savedText2Color;

if (customizationsEnabled) {
    applyText2ColorEnabledPreview(savedText2Enabled);
    applyText2ColorPreview(savedText2Color);
}

text2ColorEnabledToggle.addEventListener("change", () => {
    applyText2ColorEnabledPreview(text2ColorEnabledToggle.checked);
});

text2ColorInput.addEventListener("input", () => {
    applyText2ColorPreview(text2ColorInput.value);
});

const topBarColorControls = BAR_COLOR_SETTINGS.map((setting) => {
    const toggle = dialog.querySelector(`#${setting.toggleId}`);
    const input = dialog.querySelector(`#${setting.inputId}`);
    const saved = getSavedTopBarColor(setting);

    toggle.checked = saved.enabled;
    input.value = saved.color;

    if (customizationsEnabled) {
        applyTopBarColorPreview(setting, saved.enabled, saved.color);
    }

    toggle.addEventListener("change", () => {
        applyTopBarColorPreview(setting, toggle.checked, input.value);
    });

    input.addEventListener("input", () => {
        applyTopBarColorPreview(setting, toggle.checked, input.value);
    });

    return { setting, toggle, input };
});

const sidebarColorControls = TOGGLE_COLOR_SETTINGS.map((setting) => {
    const toggle = dialog.querySelector(`#${setting.toggleId}`);
    const input = dialog.querySelector(`#${setting.inputId}`);
    const saved = getSavedSidebarColor(setting);

    toggle.checked = saved.enabled;
    input.value = saved.color;

    if (customizationsEnabled) {
        applySidebarColorPreview(setting, saved.enabled, saved.color);
    }

    toggle.addEventListener("change", () => {
        applySidebarColorPreview(setting, toggle.checked, input.value);
    });

    input.addEventListener("input", () => {
        applySidebarColorPreview(setting, toggle.checked, input.value);
    });

    return { setting, toggle, input };
});

/* ---------- Simple coloring wiring ---------- */

const simpleModeToggle =
    dialog.querySelector("#themeModSimpleMode");

const simpleColorControls = SIMPLE_COLOR_SETTINGS.map((setting) => {
    const toggle = dialog.querySelector(`#${setting.toggleId}`);
    const input = dialog.querySelector(`#${setting.inputId}`);
    const saved = getSavedSimpleValues()[setting.key];

    toggle.checked = saved.enabled;
    input.value = saved.color;

    return { setting, toggle, input };
});

function getSimpleValuesFromInputs() {
    const values = {};

    simpleColorControls.forEach(({ setting, toggle, input }) => {
        values[setting.key] = {
            enabled: toggle.checked,
            color: input.value
        };
    });

    return values;
}

/* Re-previews the detailed colors from what's currently in
   their pickers (used when leaving simple mode). */
function previewDetailedFromInputs() {
    applySelectedEnabledPreview(selectedColorEnabledToggle.checked);
    applyHoverEnabledPreview(hoverColorEnabledToggle.checked);
    applySelectedColorPreview(selectedColorInput.value);
    applyHoverColorPreview(hoverColorInput.value);
    applyText1ColorEnabledPreview(text1ColorEnabledToggle.checked);
    applyText1ColorPreview(text1ColorInput.value);
    applyText2ColorEnabledPreview(text2ColorEnabledToggle.checked);
    applyText2ColorPreview(text2ColorInput.value);

    topBarColorControls.forEach(({ setting, toggle, input }) => {
        applyTopBarColorPreview(setting, toggle.checked, input.value);
    });

    sidebarColorControls.forEach(({ setting, toggle, input }) => {
        applySidebarColorPreview(setting, toggle.checked, input.value);
    });
}

function refreshColorPreview() {
    if (simpleModeToggle.checked) {
        applySimpleColors(getSimpleValuesFromInputs());
    } else {
        previewDetailedFromInputs();
    }
}

simpleModeToggle.checked = isSimpleModeSaved();
dialog.classList.toggle("themeModSimpleMode", simpleModeToggle.checked);

if (customizationsEnabled && simpleModeToggle.checked) {
    applySimpleColors(getSimpleValuesFromInputs());
}

/* Like "Enable customizations", this toggle saves right away */
simpleModeToggle.addEventListener("change", () => {
    localStorage.setItem(SIMPLE_MODE_LS, simpleModeToggle.checked);
    dialog.classList.toggle("themeModSimpleMode", simpleModeToggle.checked);
    refreshColorPreview();
});

simpleColorControls.forEach(({ toggle, input }) => {
    toggle.addEventListener("change", refreshColorPreview);
    input.addEventListener("input", refreshColorPreview);
});

/* Gradient rows (under some detailed colors) */
const gradientControls = setupGradientControls(dialog);

/* Animations tab (bloom switch + swatch pulse live in here too) */
const animationControls = setupAnimationsPanel(dialog);

/* Sounds tab */
const soundControls = setupSoundsPanel(dialog);

/* Popup decorations (Interface panel) */
const decoControls = setupDecoControls(dialog);

/* Chat bubbles (Interface panel) */
const bubbleControls = setupBubbleControls(dialog);

/* Safety tab */
const safetyControls = setupSafetyPanel(dialog);

        fontSelect.addEventListener("change", () => {
            applyFontValue(fontSelect.value);
        });

        fontSizeSlider.addEventListener("input", () => {
            const selectedSize =
                Number(fontSizeSlider.value);

            fontSizeValue.textContent =
                `${selectedSize}%`;

            applyFontSizePreview(
                selectedSize
            );
        });

        fontWeightSelect.addEventListener("change", () => {
            applyFontWeightPreview(
                fontWeightSelect.value
            );
        });

        spacingSlider.addEventListener("input", () => {
            const selectedSpacing =
                Number(spacingSlider.value);

            spacingValue.textContent =
                `${selectedSpacing}%`;

            applySpacingPreview(
                selectedSpacing
            );
        });

        radiusSlider.addEventListener("input", () => {
            const selectedRadius =
                Number(radiusSlider.value);

            radiusValue.textContent =
                radiusLabel(selectedRadius);

            applyRadiusPreview(
                selectedRadius
            );
        });

        const applyButton =
            dialog.querySelector(
                ".themeModApplyButton"
            );

        const resetButton =
            dialog.querySelector(
                ".themeModResetButton"
            );

        applyButton.addEventListener("click", () => {

            localStorage.setItem(
                "flockmodCustomUIFont",
                fontSelect.value
            );

            localStorage.setItem(
                "flockmodCustomUIFontSize",
                fontSizeSlider.value
            );

            localStorage.setItem(
                "flockmodCustomUIFontWeight",
                fontWeightSelect.value
            );

            localStorage.setItem(
                "flockmodCustomUISpacing",
                spacingSlider.value
            );

            localStorage.setItem(
                "flockmodCustomUIRadius",
                radiusSlider.value
            );

            localStorage.setItem(
                "flockmodCustomSelectedColor",
                selectedColorInput.value
            );

            localStorage.setItem(
                "flockmodCustomHoverColor",
                hoverColorInput.value
            );

            localStorage.setItem(
                "flockmodCustomSelectedColorEnabled",
                selectedColorEnabledToggle.checked
            );

            localStorage.setItem(
                "flockmodCustomHoverColorEnabled",
                hoverColorEnabledToggle.checked
            );

            localStorage.setItem(
                "flockmodCustomText1ColorEnabled",
                text1ColorEnabledToggle.checked
            );

            localStorage.setItem(
                "flockmodCustomText1Color",
                text1ColorInput.value
            );

            localStorage.setItem(
                "flockmodCustomText2ColorEnabled",
                text2ColorEnabledToggle.checked
            );

            localStorage.setItem(
                "flockmodCustomText2Color",
                text2ColorInput.value
            );

            topBarColorControls.forEach(({ setting, toggle, input }) => {
    localStorage.setItem(setting.lsEnabled, toggle.checked);
    localStorage.setItem(setting.lsColor, input.value);
});

                        sidebarColorControls.forEach(({ setting, toggle, input }) => {
                localStorage.setItem(setting.lsEnabled, toggle.checked);
                localStorage.setItem(setting.lsColor, input.value);
            });

            simpleColorControls.forEach(({ setting, toggle, input }) => {
                localStorage.setItem(setting.lsEnabled, toggle.checked);
                localStorage.setItem(setting.lsColor, input.value);
            });

            gradientControls.save();
            animationControls.save();
            soundControls.save();
            decoControls.save();
            bubbleControls.save();
            safetyControls.save();
        });

        /* ---------- Copy to detailed ----------
           Fills every detailed picker with what simple mode is
           currently showing, switches to detailed mode and applies,
           so the theme looks exactly the same but is now fully
           editable. Your previous detailed colors are backed up
           (Undo in the Themes tab). */
        const copyToDetailedButton =
            dialog.querySelector(".themeModCopyToDetailed");

        const actionsNote =
            dialog.querySelector(".themeModActionsNote");

        copyToDetailedButton.addEventListener("click", () => {
            const targets = {};

            applySimpleColors(getSimpleValuesFromInputs(), (cls, cssVar, enabled, color) => {
                targets[cls] = { enabled, color };
            });

            saveThemeUndo();

            [...topBarColorControls, ...sidebarColorControls].forEach(({ setting, toggle, input }) => {
                const target = targets[setting.cls];

                if (target) {
                    toggle.checked = target.enabled;
                    input.value = target.color;
                }
            });

            const pairs = [
                ["flockmodText1ColorActive", text1ColorEnabledToggle, text1ColorInput],
                ["flockmodText2ColorActive", text2ColorEnabledToggle, text2ColorInput],
                ["flockmodSelectedColorActive", selectedColorEnabledToggle, selectedColorInput],
                ["flockmodHoverColorActive", hoverColorEnabledToggle, hoverColorInput]
            ];

            pairs.forEach(([cls, toggle, input]) => {
                const target = targets[cls];

                if (target) {
                    toggle.checked = target.enabled;
                    input.value = target.color;
                }
            });

            /* Switch to detailed (saves the mode, swaps the rows,
               re-previews and rebuilds the jump chips) ... */
            simpleModeToggle.checked = false;
            simpleModeToggle.dispatchEvent(new Event("change"));

            /* ... and save it all */
            applyButton.click();

            /* v1.6.2: an Undo button right here, not just a hint about the Themes tab */
            actionsNote.innerHTML = 'Copied to detailed! <button type="button" class="themeModNoteUndo"><i class="fas fa-undo-alt"></i> Undo</button>';
            actionsNote.classList.add("visible");
            actionsNote.querySelector(".themeModNoteUndo").addEventListener("click", () => {
                dialog.querySelector(".themeModUndoButton")?.click();
            });

            clearTimeout(actionsNote._timer);
            actionsNote._timer = setTimeout(() => {
                actionsNote.classList.remove("visible");
            }, 12000);
        });

        resetButton.addEventListener("click", () => {

            fontSelect.value =
                "default";

            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font"
            );

            fontSizeSlider.value =
                "100";

            fontSizeValue.textContent =
                "100%";

            applyFontSizePreview(
                "100"
            );

            fontWeightSelect.value =
                "regular";

            applyFontWeightPreview(
                "regular"
            );

            spacingSlider.value =
                "100";

            spacingValue.textContent =
                "100%";

            applySpacingPreview(
                "100"
            );

            radiusSlider.value =
                "5";

            radiusValue.textContent =
                radiusLabel(5);

            applyRadiusPreview(
                "5"
            );

            localStorage.setItem(
                "flockmodCustomUIFont",
                "default"
            );

            localStorage.setItem(
                "flockmodCustomUIFontSize",
                "100"
            );

            localStorage.setItem(
                "flockmodCustomUIFontWeight",
                "regular"
            );

            localStorage.setItem(
                "flockmodCustomUISpacing",
                "100"
            );

            localStorage.setItem(
                "flockmodCustomUIRadius",
                "5"
            );

            animationControls.reset();
            soundControls.reset();
            decoControls.reset();
            bubbleControls.reset();
            safetyControls.reset();

            /* Reset only clears the colors of the mode you are in, so
               your detailed theme survives a reset in simple mode. */
            if (!simpleModeToggle.checked) {
            selectedColorInput.value =
                "#4f5156";

            applySelectedColorPreview(
                "#4f5156"
            );

            localStorage.setItem(
                "flockmodCustomSelectedColor",
                "#4f5156"
            );

            hoverColorInput.value =
                "#4f5156";

            applyHoverColorPreview(
                "#4f5156"
            );

            localStorage.setItem(
                "flockmodCustomHoverColor",
                "#4f5156"
            );

            /* Default for these two is ON (how they always behaved) */
            selectedColorEnabledToggle.checked = true;
            hoverColorEnabledToggle.checked = true;
            applySelectedEnabledPreview(true);
            applyHoverEnabledPreview(true);
            localStorage.setItem("flockmodCustomSelectedColorEnabled", "true");
            localStorage.setItem("flockmodCustomHoverColorEnabled", "true");

            text1ColorEnabledToggle.checked =
                false;

            applyText1ColorEnabledPreview(
                false
            );

            localStorage.setItem(
                "flockmodCustomText1ColorEnabled",
                "false"
            );

            text1ColorInput.value =
                "#ffffff";

            applyText1ColorPreview(
                "#ffffff"
            );

            localStorage.setItem(
                "flockmodCustomText1Color",
                "#ffffff"
            );

            text2ColorEnabledToggle.checked =
                false;

            applyText2ColorEnabledPreview(
                false
            );

            localStorage.setItem(
                "flockmodCustomText2ColorEnabled",
                "false"
            );

            text2ColorInput.value =
                "#ffffff";

            applyText2ColorPreview(
                "#ffffff"
            );

            localStorage.setItem(
                "flockmodCustomText2Color",
                "#ffffff"
            );

            topBarColorControls.forEach(({ setting, toggle, input }) => {
    toggle.checked = false;
    input.value = setting.defaultColor;

    applyTopBarColorPreview(setting, false, setting.defaultColor);

    localStorage.setItem(setting.lsEnabled, "false");
    localStorage.setItem(setting.lsColor, setting.defaultColor);
});


                        sidebarColorControls.forEach(({ setting, toggle, input }) => {
                toggle.checked = false;
                input.value = setting.defaultColor;

                applySidebarColorPreview(setting, false, setting.defaultColor);

                localStorage.setItem(setting.lsEnabled, "false");
                localStorage.setItem(setting.lsColor, setting.defaultColor);
            });

            gradientControls.reset();
            } else {
            /* Simple mode: only the simple colors reset, detailed stay untouched */
            simpleColorControls.forEach(({ setting, toggle, input }) => {
                toggle.checked = false;
                input.value = setting.defaultColor;

                localStorage.setItem(setting.lsEnabled, "false");
                localStorage.setItem(setting.lsColor, setting.defaultColor);
            });
            }

            /* Simple mode on/off is kept; this just re-previews
               whichever mode is active with the reset values. */
            refreshColorPreview();
        });

        stampPanelDefaults(dialog);

        setupSubsectionResets(dialog, {
            actionsNote,
            decoControls
        });

        setupStylePickers(dialog);

        enhanceCardsLayout(dialog);
        setupUnsavedNote(dialog);
        setupCloseGuard(dialog);
        setupResetAllGuard(dialog);
        setupRememberPlace(dialog);
        setupLiteMode(dialog);

        setupTour(dialog);

        dialog.querySelector(".themeModPanelHelp")?.addEventListener("click", () => {
            const active = dialog.querySelector(".themeModSidebarItem.active");
            const section = active ? active.dataset.themeSection : "general";
            dialog._startTour?.(getPanelTourSteps(dialog, section));
        });

        setupUpdateCheck(dialog);

        setupBackup(dialog);

        setupWhatsNew(dialog);

        return dialog;
    }

    /* =========================================================
       SUBSECTION RESETS (Colors + Interface panels)
       Every subsection title gets a small reset button. It puts
       only that subsection's controls back to their defaults and
       previews them. Nothing is saved until Apply Changes, and
       closing the menu without applying brings your old values
       back. The big Reset button in the bottom bar still resets
       everything at once.

       Defaults come from the markup itself (a control's value /
       checked attribute), or from data-default when the real
       default differs from that (e.g. Selected/Hover are ON).
       ========================================================= */

    function getControlDefault(el) {
        if (el.dataset.default !== undefined) {
            return el.type === "checkbox"
                ? el.dataset.default === "true"
                : el.dataset.default;
        }

        if (el.type === "checkbox") {
            return el.defaultChecked;
        }

        if (el.tagName === "SELECT") {
            const preset = Array.from(el.options).find((o) => o.defaultSelected);
            return preset ? preset.value : (el.options[0] ? el.options[0].value : "");
        }

        return el.defaultValue;
    }

    const RESETTABLE_CONTROLS = 'input[type="checkbox"], input[type="color"], input[type="range"], select, input[type="text"][data-default]';

    /* v1.6.3: write each control's default into the markup (data-default),
       for panels whose controls are filled in by code */
    function stampPanelDefaults(dialog) {
        const stamp = (sel, value) => {
            const el = typeof sel === "string" ? dialog.querySelector(sel) : sel;
            if (el) el.dataset.default = String(value);
        };

        /* Animations: everything on, normal speed */
        stamp("#themeModAnimEnabled", true);
        ANIM_EFFECTS.forEach((effect) => stamp(`#${effect.toggleId}`, true));
        stamp("#themeModAnimSpeed", 100);

        /* Sounds */
        const sd = defaultSoundSettings();
        stamp("#themeModSoundsEnabled", sd.enabled);
        stamp("#themeModSoundsVolume", sd.volume);
        stamp("#themeModSoundsQuietDrawing", sd.quietDrawing);
        stamp("#themeModSoundsKeywords", "");
        SOUND_EVENTS.forEach((ev) => {
            stamp(`#themeModSound${ev.key}Enabled`, ev.def.enabled);
            stamp(`[data-sound-select="${ev.key}"]`, ev.def.sound);
            stamp(`[data-sound-volume="${ev.key}"]`, ev.def.volume);
        });

        /* Safety */
        const ids = {
            enabled: "#themeModTrollEnabled", guestsOnly: "#themeModTrollGuestsOnly", eraser: "#themeModTrollEraser",
            fill: "#themeModTrollFill", selection: "#themeModTrollSelection", bigBrush: "#themeModTrollBigBrush",
            scribble: "#themeModTrollScribble", bigText: "#themeModTrollBigText", popup: "#themeModTrollPopup",
            warnAgain: "#themeModTrollWarnAgain", flagAfter: "#themeModTrollFlagAfter", bigBrushPx: "#themeModTrollBigBrushPx",
            bigTextPx: "#themeModTrollBigTextPx", stay: "#themeModTrollStay", popupEvery: "#themeModTrollPopupEvery",
            color: "#themeModTrollColor"
        };
        Object.entries(ids).forEach(([k, sel]) => stamp(sel, TROLL_DEFAULTS[k]));
        dialog.querySelector(`[data-troll-sens="${TROLL_DEFAULTS.sensitivity}"]`)?.setAttribute("data-reset-click", "");

        /* Backgrounds */
        BACKGROUND_PLACES.forEach((place) => {
            bgFieldsFor(place).forEach(([suffix, , def]) => stamp(`#themeModBg${place.idPart}${suffix}`, def));
        });
    }

    function resetControlToDefault(el) {
        const def = getControlDefault(el);

        if (el.type === "checkbox") {
            el.checked = def;
        } else if (el.tagName === "SELECT") {
            /* Fall back to the first option if the default isn't listed */
            const exists = Array.from(el.options).some((o) => o.value === def);
            el.value = exists ? def : (el.options[0] ? el.options[0].value : "");
        } else {
            el.value = def;
        }

        /* Fire both so every existing preview listener runs
           (colors/ranges listen to input, toggles/selects to change) */
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
    }

    /* Everything after a subsection title up to the next title */
    function getSubsectionElements(title) {
        const elements = [];
        let node = title.nextElementSibling;

        while (node && !node.classList.contains("themeModSubsectionTitle")) {
            elements.push(node);
            node = node.nextElementSibling;
        }

        return elements;
    }

    /* =========================================================
       STYLE PICKERS (Interface > Popup Decorations / Chat Bubbles)
       Tiles instead of long dropdowns. The dropdowns are still
       there (hidden) and still hold the value, so Apply, theme
       codes, backups, resets and search all work like before.
       Kept cheap: tiles are built once when the menu is made,
       never animate, and only change on a click.
       ========================================================= */

    const STYLE_MATCH_LS = "flockmodStyleMatch";
    const STYLE_GROUP_ORDER = ["Basic", "Cute", "Dark", "Neutral"];

    /* Popup decoration groups (bubbles keep theirs in BUB_STYLES).
       Anything not clearly dark goes in Neutral. */
    const DECO_STYLE_GROUPS = {
        cat: "Cute", dog: "Cute", bunny: "Cute", bear: "Cute", fox: "Cute",
        stars: "Cute", sakura: "Cute", witch: "Cute", lamb: "Cute", cafe: "Cute", grinball: "Cute", lucky: "Cute",
        glitch: "Dark", dragon: "Dark", gothic: "Dark", terminal: "Dark", spiderweb: "Dark", rose: "Dark", maid: "Dark",
        moth: "Neutral", leaves: "Neutral", strawberry: "Neutral", nightsky: "Neutral", celestial: "Neutral", shoreline: "Neutral", sharks: "Neutral",
        ink: "Neutral", deepsea: "Neutral", minimal: "Neutral"
    };

    const STYLE_LABEL_SHORT = { "Off (FlockMod's normal chat)": "Off", "Butterfly (pastel)": "Butterfly", "Ink (sumi-e)": "Ink", "Pixel / 8-bit": "Pixel" };

    function decoThumbHTML(key) {
        const style = DECO_STYLES[key];

        if (key === "none" || !style) {
            return '<span class="fmThumbPopup"><span class="fmThumbBar"></span></span>';
        }

        const f = style.frame || {};
        const p = { ...DECO_COLOR_DEFAULTS, ...(style.palette || {}) };
        const vars = `--fmdeco-main:${p.main};--fmdeco-outline:${p.outline};--fmdeco-detail:${p.detail};--fmdeco-sparkle:${p.sparkle}`;
        const frame = `background:${f.bg || "#232428"};border-color:${f.border || DECO_FRAME_FALLBACK.border}`;

        return `<span class="fmThumbPopup" style="${vars};${frame}">` +
               `<span class="fmThumbBar" style="background:${f.title || DECO_FRAME_FALLBACK.title}"></span>` +
               `<span class="fmDeco">${buildDecoHTML({ style: key, placement: style.placements[0] || "side" })}</span></span>`;
    }

    function bubbleThumbHTML(key) {
        const style = BUB_STYLES[key];

        if (key === "none" || !style) {
            return '<span class="fmThumbPlain"><i></i><i></i></span>';
        }

        const c = bubbleColors({ style: key, custom: false });
        const vars = BUB_ROLE_KEYS.map((k) => `--fmbub-${k}:${c[k]}`).join(";");
        const deco = style.deco ? `<span class="fmBubDeco">${style.deco}</span>` : "";

        return `<span class="themeModBubblePreview fmPrevOn fmBubRight fmThumbChat" data-fm-bub="${key}" style="${vars}">` +
               '<span class="chatBlock messageBlock" data-type="MYMSG"><span class="msgContent"><span class="msgLine">' +
               `<span class="msgText${deco ? " fmBubHasDeco" : ""}">hi!${deco}</span>` +
               "</span></span></span></span>";
    }

    function setupStylePickers(dialog) {
        const deco = makeStylePicker(dialog, "#themeModDecoStyle", DECO_STYLES,
            (k) => DECO_STYLE_GROUPS[k] || "", decoThumbHTML);
        const bub = makeStylePicker(dialog, "#themeModBubbleStyle", BUB_STYLES,
            (k) => BUB_STYLES[k].group || "", bubbleThumbHTML);
        const matchToggle = dialog.querySelector("#themeModStyleMatch");

        if (!deco || !bub) {
            return;
        }

        /* Match switch: saved right away (it doesn't change any looks) */
        const showMatch = () => dialog.classList.toggle("fmStyleMatchOn", Boolean(matchToggle && matchToggle.checked));

        if (matchToggle) {
            matchToggle.checked = localStorage.getItem(STYLE_MATCH_LS) !== "false";
            matchToggle.addEventListener("change", () => {
                localStorage.setItem(STYLE_MATCH_LS, String(matchToggle.checked));
                showMatch();
            });
        }

        showMatch();

        const link = (from, to) => {
            from.onPick = (key) => {
                if (matchToggle && matchToggle.checked && key !== "none" && to.has(key) && to.select.value !== key) {
                    to.pick(key);
                }
            };
        };

        link(deco, bub);
        link(bub, deco);

        /* Link icons only on tiles that have a partner */
        deco.grid.querySelectorAll(".fmStyleTile").forEach((t) => t.classList.toggle("fmStyleHasPair", bub.has(t.dataset.key) && t.dataset.key !== "none"));
        bub.grid.querySelectorAll(".fmStyleTile").forEach((t) => t.classList.toggle("fmStyleHasPair", deco.has(t.dataset.key) && t.dataset.key !== "none"));
    }

    function makeStylePicker(dialog, selector, styles, groupOf, thumb) {
        const select = dialog.querySelector(selector);
        const row = select && select.closest(".themeModSetting");

        if (!row || row.querySelector(".fmStylePick")) {
            return null;
        }

        const keys = Array.from(select.options).map((o) => o.value).filter((k) => styles[k]);
        const counts = {};
        keys.forEach((k) => {
            const g = groupOf(k);
            if (g) counts[g] = (counts[g] || 0) + 1;
        });

        const groups = STYLE_GROUP_ORDER.filter((g) => counts[g]);
        const label = (k) => STYLE_LABEL_SHORT[styles[k].label] || styles[k].label;

        const pick = document.createElement("div");
        pick.className = "fmStylePick";
        pick.innerHTML =
            '<div class="fmStyleChips">' +
            `<button type="button" class="fmStyleChip fmStyleChipOn" data-group="all">All <span>${keys.length - 1}</span></button>` +
            groups.map((g) => `<button type="button" class="fmStyleChip" data-group="${g}">${g} <span>${counts[g]}</span></button>`).join("") +
            "</div>" +
            '<div class="fmStyleGrid" role="listbox">' +
            keys.map((k) =>
                `<div class="fmStyleTile" role="option" tabindex="0" data-key="${k}" data-group="${groupOf(k)}" title="${styles[k].label}">` +
                `<span class="fmStyleThumb" aria-hidden="true">${thumb(k)}</span>` +
                `<span class="fmStyleName">${label(k)}</span>` +
                '<i class="fas fa-link fmStyleLink" aria-hidden="true"></i></div>'
            ).join("") +
            "</div>";

        row.appendChild(pick);

        const grid = pick.querySelector(".fmStyleGrid");
        const tiles = Array.from(grid.children);
        let lastKey = null;

        /* Where "Current: …" shows (the card title, also when folded).
           Drawn with CSS from a data attribute, so chips/search don't read it. */
        let titleLabel = null;
        const findTitle = () => {
            if (titleLabel) return titleLabel;
            let node = row.previousElementSibling;
            while (node && !node.classList.contains("themeModSubsectionTitle")) node = node.previousElementSibling;
            titleLabel = node ? (node.querySelector(".themeModSubsectionLabel") || node) : null;
            return titleLabel;
        };

        function sync() {
            const key = select.value;

            if (key === lastKey) {
                return;
            }

            lastKey = key;
            tiles.forEach((t) => {
                const on = t.dataset.key === key;
                t.classList.toggle("fmStyleOn", on);
                t.setAttribute("aria-selected", String(on));
            });

            const title = findTitle();
            if (title) {
                if (key && key !== "none" && styles[key]) title.dataset.fmCurrent = label(key);
                else delete title.dataset.fmCurrent;
            }
        }

        /* Every way the value changes (load, theme codes, resets)
           sets select.value, so catch that and keep tiles in sync */
        const native = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value");
        Object.defineProperty(select, "value", {
            configurable: true,
            get() { return native.get.call(this); },
            set(v) { native.set.call(this, v); sync(); }
        });
        select.addEventListener("change", sync);

        const api = {
            select,
            grid,
            onPick: null,
            has: (k) => Boolean(styles[k]) && keys.includes(k),
            pick(key) {
                select.value = key;
                select.dispatchEvent(new Event("change", { bubbles: true }));
            }
        };

        const choose = (tile) => {
            const key = tile.dataset.key;
            if (key === select.value) return;
            api.pick(key);
            if (api.onPick) api.onPick(key);
        };

        grid.addEventListener("click", (event) => {
            const tile = event.target.closest(".fmStyleTile");
            if (tile) choose(tile);
        });

        grid.addEventListener("keydown", (event) => {
            const tile = event.target.closest(".fmStyleTile");
            if (tile && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                choose(tile);
            }
        });

        /* Filter chips. "Off/None" stays in every filter. */
        pick.querySelector(".fmStyleChips").addEventListener("click", (event) => {
            const chip = event.target.closest(".fmStyleChip");
            if (!chip) return;
            const g = chip.dataset.group;
            pick.querySelectorAll(".fmStyleChip").forEach((c) => c.classList.toggle("fmStyleChipOn", c === chip));
            tiles.forEach((t) => {
                t.hidden = g !== "all" && t.dataset.key !== "none" && t.dataset.group !== g;
            });
        });

        sync();
        return api;
    }

    function setupSubsectionResets(dialog, { actionsNote, decoControls }) {
        /* v1.6.3: Animations, Sounds, Safety and Backgrounds too */
        const panels = dialog.querySelectorAll(
            ["colors", "interface", "animations", "sounds", "safety", "backgrounds"]
                .map((p) => `.themeModSectionContent[data-theme-panel="${p}"]`).join(", ")
        );

        const showNote = (text) => {
            if (!actionsNote) {
                return;
            }

            actionsNote.textContent = text;
            actionsNote.classList.add("visible");

            clearTimeout(actionsNote._timer);
            actionsNote._timer = setTimeout(() => {
                actionsNote.classList.remove("visible");
            }, 4000);
        };

        panels.forEach((panel) => {
            panel.querySelectorAll(".themeModSubsectionTitle").forEach((title) => {
                if (title.querySelector(".themeModSubsectionReset")) {
                    return;
                }

                /* Wrap the text so the button can sit on the right
                   (chips/search still read the title's text fine,
                   the button has no text of its own) */
                const label = document.createElement("span");
                label.className = "themeModSubsectionLabel";

                while (title.firstChild) {
                    label.appendChild(title.firstChild);
                }

                const name = label.textContent.trim();

                /* nothing to reset here (like Your Sounds): no button */
                const resettable = getSubsectionElements(title).some((el) =>
                    el.querySelector(RESETTABLE_CONTROLS + ", [data-reset-click]") || el.matches(RESETTABLE_CONTROLS + ", [data-reset-click]"));

                if (!resettable) {
                    title.appendChild(label);
                    return;
                }

                const button = document.createElement("button");
                button.type = "button";
                button.className = "themeModSubsectionReset";
                button.title = `Reset ${name} to default`;
                button.setAttribute("aria-label", `Reset ${name} to default`);
                button.innerHTML = '<i class="fas fa-undo-alt"></i>';

                title.appendChild(label);
                title.appendChild(button);

                button.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const elements = getSubsectionElements(title);
                    const hasDeco = elements.some((el) =>
                        el.matches(".themeModDecoColors, .themeModDecoPreviewWrap") ||
                        el.querySelector("#themeModDecoStyle")
                    );

                    elements.forEach((el) => {
                        /* Popup Decorations has its own reset below */
                        if (hasDeco && (
                            el.querySelector('[id^="themeModDeco"], [data-deco-color]') ||
                            el.matches(".themeModDecoColors, .themeModDecoPreviewWrap")
                        )) {
                            return;
                        }

                        el.querySelectorAll(RESETTABLE_CONTROLS).forEach(resetControlToDefault);
                        /* buttons standing in for a control (Safety > Sensitivity) */
                        el.querySelectorAll("[data-reset-click]").forEach((b) => b.click());
                    });

                    if (hasDeco && decoControls && decoControls.resetPreview) {
                        decoControls.resetPreview();
                    }

                    button.classList.remove("themeModSubsectionResetSpin");
                    void button.offsetWidth;
                    button.classList.add("themeModSubsectionResetSpin");

                    showNote(`${name} reset. Press Apply Changes to keep it.`);
                });
            });
        });
    }

    /* =========================================================
       VERSION + UPDATE CHECK (General panel)
       The version comes from manifest.json, so bumping "version"
       there is all a release needs. "Check for updates" reads the
       manifest.json on GitHub and compares. It only goes online
       when the button is pressed, only talks to GitHub, and sends
       nothing about you or FlockMod.

       SETUP: UPDATE_REPO is your GitHub "username/repository",
       UPDATE_MANIFEST_PATH is where manifest.json sits inside it.
       If you ever move the files to the top of the repository,
       change the path to just "manifest.json".
       ========================================================= */

    const UPDATE_REPO = "nlobby4/FlockTheme";
    const UPDATE_BRANCH = "main";
    const UPDATE_MANIFEST_PATH = "Flockmod Themer and Mod/manifest.json";
    const UPDATE_DOWNLOAD_URL = "";      /* optional; defaults to the repo page */

    /* v1.6.3: "Report a bug" opens a new GitHub issue with the mod version
       and browser already filled in (nothing is sent until they post it) */
    function bugReportURL() {
        const ua = navigator.userAgent;
        const browser =
            /Edg\//.test(ua) ? `Edge ${(ua.match(/Edg\/(\d+)/) || [])[1] || ""}` :
            /OPR\//.test(ua) ? `Opera ${(ua.match(/OPR\/(\d+)/) || [])[1] || ""}` :
            /Firefox\//.test(ua) ? `Firefox ${(ua.match(/Firefox\/(\d+)/) || [])[1] || ""}` :
            /Chrome\//.test(ua) ? `Chrome ${(ua.match(/Chrome\/(\d+)/) || [])[1] || ""}` : "Other";
        const os = /Windows/.test(ua) ? "Windows" : /Mac OS/.test(ua) ? "Mac" : /CrOS/.test(ua) ? "ChromeOS" : /Linux/.test(ua) ? "Linux" : "Other";
        const body =
            "**What happened?**\n\n\n**What did you expect to happen?**\n\n\n" +
            `---\nFlockTheme v${getModVersion()}\nBrowser: ${browser.trim()} on ${os}\n`;
        const repo = getUpdateRepo();
        return `https://github.com/${repo}/issues/new?body=${encodeURIComponent(body)}`;
    }

    function getModVersion() {
        try {
            return chrome.runtime.getManifest().version || "?";
        } catch (error) {
            return "?";
        }
    }

    /* 1.10 > 1.9, 1.0 == 1.0.0 */
    function compareVersions(a, b) {
        const pa = String(a).split(".").map((n) => parseInt(n, 10) || 0);
        const pb = String(b).split(".").map((n) => parseInt(n, 10) || 0);
        const len = Math.max(pa.length, pb.length);

        for (let i = 0; i < len; i++) {
            const diff = (pa[i] || 0) - (pb[i] || 0);

            if (diff !== 0) {
                return diff > 0 ? 1 : -1;
            }
        }

        return 0;
    }

    const UPDATE_AUTO_LS = "flockmodAutoUpdateCheck";
    const UPDATE_LAST_CHECK_LS = "flockmodLastUpdateCheck";
    const UPDATE_LATEST_LS = "flockmodLatestKnownVersion";
    const UPDATE_AUTO_EVERY_MS = 24 * 60 * 60 * 1000;
    const UPDATE_DOT_SEEN_LS = "flockmodUpdateDotSeen";

    /* v1.6.3: ON unless someone turned it off */
    function autoUpdateOn() {
        return localStorage.getItem(UPDATE_AUTO_LS) !== "false";
    }

    /* v1.6.3: pink dot on the bottom bar flower while an update is out
       (until you've looked at it in General) */
    function refreshFlowerUpdateDot() {
        const button = document.querySelector(MOD_BUTTON_SELECTOR);

        if (!button) {
            return;
        }

        const latest = localStorage.getItem(UPDATE_LATEST_LS);
        const has = Boolean(latest) && compareVersions(latest, getModVersion()) > 0 &&
            localStorage.getItem(UPDATE_DOT_SEEN_LS) !== latest;

        button.classList.toggle("fmHasUpdateDot", has);
        button.title = has ? `Update available: v${latest}` : "Theme Mod Menu";
    }

    /* v1.6.3: the daily check also runs when FlockMod loads, so the dot can
       show without opening the menu. Only asks GitHub for a version number. */
    function backgroundUpdateCheck() {
        refreshFlowerUpdateDot();

        if (!autoUpdateOn() || !getUpdateRepo()) {
            return;
        }

        const last = Number(localStorage.getItem(UPDATE_LAST_CHECK_LS)) || 0;

        if (Date.now() - last < UPDATE_AUTO_EVERY_MS) {
            return;
        }

        fetchLatestVersion().then(refreshFlowerUpdateDot).catch(() => {});
    }

    function getUpdateRepo() {
        return UPDATE_REPO.trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\/+$/, "");
    }

    /* Resolves to the newest version string on GitHub, or throws */
    async function fetchLatestVersion() {
        const repo = getUpdateRepo();

        if (!repo) {
            throw new Error("No repo set");
        }

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);

        try {
            const path = UPDATE_MANIFEST_PATH.split("/").map(encodeURIComponent).join("/");
            const response = await fetch(
                `https://raw.githubusercontent.com/${repo}/${UPDATE_BRANCH}/${path}`,
                { cache: "no-store", credentials: "omit", signal: controller.signal }
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const latest = String((await response.json()).version || "");

            if (!/^\d+(\.\d+){0,3}$/.test(latest)) {
                throw new Error("No version found");
            }

            localStorage.setItem(UPDATE_LATEST_LS, latest);
            localStorage.setItem(UPDATE_LAST_CHECK_LS, String(Date.now()));
            return latest;
        } finally {
            clearTimeout(timer);
        }
    }

    function setupUpdateCheck(dialog) {
        const button = dialog.querySelector(".themeModUpdateButton");
        const status = dialog.querySelector(".themeModUpdateStatus");
        const autoToggle = dialog.querySelector("#themeModAutoUpdate");
        const generalTab = dialog.querySelector('.themeModSidebarItem[data-theme-section="general"]');
        const titleTag = dialog.querySelector(".themeModTitleVersion");

        if (!button || !status) {
            return;
        }

        const current = getModVersion();
        const repo = getUpdateRepo();
        const downloadUrl = UPDATE_DOWNLOAD_URL || (repo ? `https://github.com/${repo}` : "");

        const show = (kind, html) => {
            status.className = `themeModUpdateStatus themeModUpdate${kind}`;
            status.innerHTML = html;
            status.style.display = "flex";
        };

        const link = (text) =>
            `<a href="${downloadUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;

        /* Pink dot on General + the title tag while an update is known */
        const markUpdate = (latest) => {
            const has = Boolean(latest) && compareVersions(latest, current) > 0;
            generalTab?.classList.toggle("themeModHasUpdate", has);
            titleTag?.classList.toggle("themeModHasUpdate", has);

            if (titleTag) {
                titleTag.title = has ? `Version ${latest} is out` : "";
            }

            return has;
        };

        const showResult = (latest) => {
            const result = compareVersions(latest, current);
            markUpdate(latest);

            if (result > 0) {
                show("Available", `<i class="fas fa-seedling"></i><span>Version <b>v${latest}</b> is out (you have v${current}). ${link("Get the update")}</span>`);
            } else if (result === 0) {
                show("Current", `<i class="fas fa-check-circle"></i><span>You're up to date! (v${current})</span>`);
            } else {
                show("Current", `<i class="fas fa-check-circle"></i><span>You're ahead of the latest release (v${current}, newest is v${latest}).</span>`);
            }
        };

        button.addEventListener("click", async () => {
            if (!repo) {
                show("Error", '<i class="fas fa-circle-info"></i><span>Update checking isn\'t set up in this copy of the mod yet.</span>');
                return;
            }

            button.disabled = true;
            show("Checking", '<i class="fas fa-spinner fa-spin"></i><span>Checking for updates...</span>');

            try {
                showResult(await fetchLatestVersion());
                seenUpdate();
            } catch (error) {
                show("Error", `<i class="fas fa-exclamation-circle"></i><span>Couldn't check right now. You might be offline. ${downloadUrl ? link("Open the download page") : ""}</span>`);
            } finally {
                button.disabled = false;
            }
        });

        /* v1.6.3: looking at General while an update is known clears the flower dot */
        const seenUpdate = () => {
            const latest = localStorage.getItem(UPDATE_LATEST_LS);

            if (latest && compareVersions(latest, current) > 0) {
                localStorage.setItem(UPDATE_DOT_SEEN_LS, latest);
                refreshFlowerUpdateDot();
            }
        };

        generalTab?.addEventListener("click", seenUpdate);
        setTimeout(() => {
            if (dialog.isConnected && generalTab?.classList.contains("active")) seenUpdate();
        }, 300);

        /* ---- Automatic check (ON by default since v1.6.3; saves right away) ---- */
        if (!autoToggle) {
            return;
        }

        autoToggle.checked = autoUpdateOn();

        const autoCheck = async () => {
            if (!autoToggle.checked || !repo) {
                return;
            }

            /* Show what we already know without going online */
            const known = localStorage.getItem(UPDATE_LATEST_LS);

            if (known && markUpdate(known)) {
                showResult(known);
            }

            const last = Number(localStorage.getItem(UPDATE_LAST_CHECK_LS)) || 0;

            if (Date.now() - last < UPDATE_AUTO_EVERY_MS) {
                return;
            }

            try {
                const latest = await fetchLatestVersion();

                if (dialog.isConnected && markUpdate(latest)) {
                    showResult(latest);
                }

                refreshFlowerUpdateDot();
            } catch (error) {
                /* Quiet: try again next time the menu opens */
            }
        };

        autoToggle.addEventListener("change", () => {
            localStorage.setItem(UPDATE_AUTO_LS, autoToggle.checked);

            if (autoToggle.checked) {
                autoCheck();
            } else {
                markUpdate(null);
            }

            refreshFlowerUpdateDot();
        });

        autoCheck();
    }

    /* =========================================================
       WHAT'S NEW CARD
       Shown inside the mod menu (so it moves and resizes with it).
       After an update it pops up once on its own; brand-new users
       get the tour prompt instead and never see it on first open.
       ========================================================= */

    const WHATS_NEW_SEEN_LS = "flockmodLastSeenVersion";

    function hasExistingModData() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key && key.startsWith("flockmod") && key !== "flockmodMenuRect" && key !== WHATS_NEW_SEEN_LS) {
                return true;
            }
        }

        return false;
    }

    function setupWhatsNew(dialog) {
        const current = getModVersion();
        const button = dialog.querySelector(".themeModWhatsNewButton");
        let card = null;

        const close = () => {
            card?.remove();
            card = null;
            localStorage.setItem(WHATS_NEW_SEEN_LS, current);
        };

        /* Entries to show: newer than lastSeen (auto) or the latest few (button) */
        const pickEntries = (lastSeen) => {
            const list = CHANGELOG.filter((entry) =>
                entry && entry.version && Array.isArray(entry.notes) &&
                compareVersions(entry.version, current) <= 0
            );

            return lastSeen
                ? list.filter((entry) => compareVersions(entry.version, lastSeen) > 0)
                : list.slice(0, 3);
        };

        const open = (entries, updated) => {
            if (!entries.length) {
                return;
            }

            card?.remove();

            card = document.createElement("div");
            card.className = "fmWhatsNew";
            card.setAttribute("role", "dialog");
            card.setAttribute("aria-label", "What's new");

            const head = document.createElement("div");
            head.className = "fmWhatsNewHead";
            head.innerHTML = `<span class="fmTourFlower" aria-hidden="true"></span>`;

            const title = document.createElement("div");
            title.className = "fmWhatsNewTitle";
            title.textContent = updated ? `Updated to v${current}!` : "What's new";
            head.appendChild(title);

            const closeX = document.createElement("button");
            closeX.type = "button";
            closeX.className = "fmWhatsNewClose";
            closeX.title = "Close";
            closeX.innerHTML = "&times;";
            closeX.addEventListener("click", close);
            head.appendChild(closeX);

            const body = document.createElement("div");
            body.className = "fmWhatsNewBody";

            entries.forEach((entry) => {
                const label = document.createElement("div");
                label.className = "fmWhatsNewVersion";
                label.textContent = `v${entry.version}`;
                body.appendChild(label);

                const ul = document.createElement("ul");

                entry.notes.forEach((note) => {
                    const li = document.createElement("li");
                    /* {pink:Name} / {blue:Name} / {teal:Name} / {orange:Name} = a glowing colored name */
                    String(note).split(/(\{(?:pink|blue|teal|orange):[^}]+\})/).forEach((part) => {
                        const m = part.match(/^\{(pink|blue|teal|orange):([^}]+)\}$/);

                        if (m) {
                            const name = document.createElement("span");
                            name.className = `fmWhatsNewName fmWhatsNewName-${m[1]}`;
                            name.textContent = m[2];
                            li.appendChild(name);
                        } else if (part) {
                            li.appendChild(document.createTextNode(part));
                        }
                    });
                    ul.appendChild(li);
                });

                body.appendChild(ul);
            });

            const foot = document.createElement("div");
            foot.className = "fmWhatsNewFoot";

            const ok = document.createElement("button");
            ok.type = "button";
            ok.className = "fmTourBtn fmTourMain";
            ok.textContent = "Got it!";
            ok.addEventListener("click", close);
            foot.appendChild(ok);

            card.append(head, body, foot);
            (dialog.querySelector(".themeModDialogInner") || dialog).appendChild(card);
        };

        button?.addEventListener("click", () => open(pickEntries(null), false));

        /* ---- Automatic, once per update ---- */
        const lastSeen = localStorage.getItem(WHATS_NEW_SEEN_LS);

        if (lastSeen === null) {
            /* Brand-new user (the tour handles them) vs. someone
               updating from a version before this card existed */
            if (localStorage.getItem("flockmodTourSeen") === "true" || hasExistingModData()) {
                const entries = pickEntries(null).slice(0, 1);
                queueNewSpots(entries, current);
                setTimeout(() => dialog.isConnected && open(entries, true), 400);
            } else {
                localStorage.setItem(WHATS_NEW_SEEN_LS, current);
            }
        } else if (compareVersions(current, lastSeen) > 0) {
            queueNewSpots(pickEntries(lastSeen), current);
            setTimeout(() => dialog.isConnected && open(pickEntries(lastSeen), true), 400);
        }

        setupNewSpots(dialog);
    }

    /* =========================================================
       NEW-FEATURE DOTS (v1.6.3)
       After an update, a pink dot marks each new thing (the
       CHANGELOG's "spots") and the tab it's on. Opening that tab
       counts as seen: the tab's dot goes right away, the dots
       inside stay until the menu is closed. New users get none.
       ========================================================= */
    const NEW_SPOTS_LS = "flockmodNewSpots";
    const NEW_SPOTS_FOR_LS = "flockmodNewSpotsVersion";

    function getNewSpots() {
        try {
            const list = JSON.parse(localStorage.getItem(NEW_SPOTS_LS) || "[]");
            return Array.isArray(list) ? list.filter((x) => x && typeof x.spot === "string") : [];
        } catch (error) {
            return [];
        }
    }

    function setNewSpots(list) {
        if (list.length) localStorage.setItem(NEW_SPOTS_LS, JSON.stringify(list));
        else localStorage.removeItem(NEW_SPOTS_LS);
    }

    /* Once per update (the What's new card can show more than once if it isn't closed) */
    function queueNewSpots(entries, current) {
        if (localStorage.getItem(NEW_SPOTS_FOR_LS) === current) return;
        localStorage.setItem(NEW_SPOTS_FOR_LS, current);

        const list = getNewSpots();
        entries.forEach((entry) => (Array.isArray(entry.spots) ? entry.spots : []).forEach((spot) => {
            if (typeof spot === "string" && !list.some((x) => x.spot === spot)) {
                list.push({ spot, version: entry.version });
            }
        }));
        setNewSpots(list);
    }

    function findNewSpot(dialog, spot) {
        if (spot.startsWith("#")) {
            let el = null;
            try { el = dialog.querySelector(spot); } catch (error) { return null; }
            if (!el) return null;
            return el.closest(".themeModSetting") || el.closest("label") || el;
        }

        const [tab, section] = spot.split(">").map((x) => x.trim().toLowerCase());
        const panel = dialog.querySelector(`[data-theme-panel="${CSS.escape(tab || "")}"]`);
        if (!panel || !section) return null;

        return Array.from(panel.querySelectorAll(".themeModSubsectionTitle")).find((t) => {
            const copy = (t.querySelector(".themeModSubsectionLabel") || t).cloneNode(true);
            copy.querySelectorAll("button, .fmNewDot").forEach((b) => b.remove());
            return copy.textContent.replace(/\s+/g, " ").trim().toLowerCase() === section;
        }) || null;
    }

    function addNewDot(where, version) {
        if (!where || where.querySelector(":scope > .fmNewDot")) return;
        const dot = document.createElement("span");
        dot.className = "fmNewDot";
        dot.title = `New in v${version}`;
        where.appendChild(dot);
    }

    function setupNewSpots(dialog) {
        const list = getNewSpots();
        if (!list.length) return;

        const byTab = new Map();

        list.forEach(({ spot, version }) => {
            const target = findNewSpot(dialog, spot);
            const panel = target?.closest("[data-theme-panel]");
            if (!target || !panel) return;

            const tab = panel.dataset.themePanel;
            if (!byTab.has(tab)) byTab.set(tab, version);

            if (target.classList.contains("themeModSubsectionTitle")) {
                addNewDot(target.querySelector(".themeModSubsectionLabel") || target, version);
            } else {
                addNewDot(target.querySelector(".themeModSettingName") || target, version);

                /* its section title too, so it shows while the card is folded */
                const titles = Array.from(panel.querySelectorAll(".themeModSubsectionTitle"))
                    .filter((t) => t.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING);
                const title = titles[titles.length - 1];
                if (title) addNewDot(title.querySelector(".themeModSubsectionLabel") || title, version);
            }
        });

        /* Spots that no longer exist in the menu: forget them */
        setNewSpots(list.filter(({ spot }) => {
            const target = findNewSpot(dialog, spot);
            return target && target.closest("[data-theme-panel]");
        }));

        byTab.forEach((version, tab) => {
            addNewDot(dialog.querySelector(`.themeModSidebarItem[data-theme-section="${tab}"]`), version);
        });

        const seen = (tab) => {
            if (!byTab.has(tab)) return;
            byTab.delete(tab);
            dialog.querySelector(`.themeModSidebarItem[data-theme-section="${tab}"] > .fmNewDot`)?.remove();
            setNewSpots(getNewSpots().filter(({ spot }) => {
                const target = findNewSpot(dialog, spot);
                return target && target.closest("[data-theme-panel]")?.dataset.themePanel !== tab;
            }));
        };

        dialog.querySelectorAll(".themeModSidebarItem[data-theme-section]").forEach((button) => {
            button.addEventListener("click", () => seen(button.dataset.themeSection));
        });

        const active = dialog.querySelector(".themeModSidebarItem.active");
        if (active) seen(active.dataset.themeSection);
    }

    /* =========================================================
       FULL BACKUP FILE (General panel)
       Everything the mod keeps: every localStorage key starting
       with "flockmod" plus the four file databases (background
       images, sounds, reference images, fonts). Files are stored
       as base64 inside one .json file. Nothing goes online.
       ========================================================= */

    const BACKUP_FORMAT = 1;

    function getBackupDatabases() {
        return [
            { name: BG_DB_NAME, store: BG_DB_STORE, open: openBgDB },
            { name: SOUND_DB_NAME, store: SOUND_DB_STORE, open: openSoundDB },
            { name: REF_DB_NAME, store: REF_DB_STORE, open: openRefDB },
            { name: FONT_DB_NAME, store: FONT_DB_STORE, open: openFontDB }
        ];
    }

    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });
    }

    function base64ToBytes(b64) {
        const binary = atob(b64);
        const bytes = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        return bytes;
    }

    /* Turns Blobs/Files/ArrayBuffers (anywhere in a value) into JSON-safe objects */
    async function packValue(value) {
        if (value instanceof Blob) {
            const packed = { __fmBackup: "blob", type: value.type, data: await blobToBase64(value) };

            if (value instanceof File) {
                packed.__fmBackup = "file";
                packed.name = value.name;
                packed.lastModified = value.lastModified;
            }

            return packed;
        }

        if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
            const bytes = value instanceof ArrayBuffer
                ? new Uint8Array(value)
                : new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
            return { __fmBackup: "buffer", data: await blobToBase64(new Blob([bytes])) };
        }

        if (Array.isArray(value)) {
            return Promise.all(value.map(packValue));
        }

        if (value && typeof value === "object") {
            const out = {};

            for (const [k, v] of Object.entries(value)) {
                out[k] = await packValue(v);
            }

            return out;
        }

        return value;
    }

    function unpackValue(value) {
        if (Array.isArray(value)) {
            return value.map(unpackValue);
        }

        if (value && typeof value === "object") {
            if (value.__fmBackup === "blob" || value.__fmBackup === "file") {
                const bytes = base64ToBytes(value.data || "");

                return value.__fmBackup === "file"
                    ? new File([bytes], value.name || "file", { type: value.type || "", lastModified: value.lastModified || Date.now() })
                    : new Blob([bytes], { type: value.type || "" });
            }

            if (value.__fmBackup === "buffer") {
                return base64ToBytes(value.data || "").buffer;
            }

            const out = {};

            for (const [k, v] of Object.entries(value)) {
                out[k] = unpackValue(v);
            }

            return out;
        }

        return value;
    }

    function readAllEntries(db, storeName) {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const keysReq = store.getAllKeys();
            const valuesReq = store.getAll();

            tx.oncomplete = () => resolve(keysReq.result.map((key, i) => [key, valuesReq.result[i]]));
            tx.onerror = () => reject(tx.error);
        });
    }

    function replaceAllEntries(db, storeName, entries) {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);

            store.clear();
            entries.forEach(([key, value]) => store.put(value, key));

            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
        });
    }

    async function buildBackup() {
        const storage = {};

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key && key.startsWith("flockmod")) {
                storage[key] = localStorage.getItem(key);
            }
        }

        const databases = {};

        for (const d of getBackupDatabases()) {
            const db = await d.open();

            try {
                const entries = await readAllEntries(db, d.store);
                databases[d.name] = await Promise.all(
                    entries.map(async ([key, value]) => [key, await packValue(value)])
                );
            } finally {
                db.close();
            }
        }

        return {
            app: "FlockMod Themer",
            kind: "backup",
            format: BACKUP_FORMAT,
            modVersion: getModVersion(),
            created: new Date().toISOString(),
            localStorage: storage,
            databases
        };
    }

    async function restoreBackup(backup) {
        /* Settings: drop the mod's current keys, then write the backup's */
        const oldKeys = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key && key.startsWith("flockmod")) {
                oldKeys.push(key);
            }
        }

        oldKeys.forEach((key) => localStorage.removeItem(key));

        Object.entries(backup.localStorage || {}).forEach(([key, value]) => {
            if (key.startsWith("flockmod") && typeof value === "string") {
                localStorage.setItem(key, value);
            }
        });

        /* Files */
        for (const d of getBackupDatabases()) {
            const entries = Array.isArray(backup.databases?.[d.name]) ? backup.databases[d.name] : [];
            const db = await d.open();

            try {
                await replaceAllEntries(db, d.store, entries.map(([key, value]) => [key, unpackValue(value)]));
            } finally {
                db.close();
            }
        }
    }

    function setupBackup(dialog) {
        const saveButton = dialog.querySelector(".themeModBackupSave");
        const loadButton = dialog.querySelector(".themeModBackupLoad");
        const fileInput = dialog.querySelector(".themeModBackupFile");
        const status = dialog.querySelector(".themeModBackupStatus");

        if (!saveButton || !loadButton || !fileInput || !status) {
            return;
        }

        const show = (kind, html) => {
            status.className = `themeModBackupStatus themeModUpdateStatus themeModUpdate${kind}`;
            status.innerHTML = html;
            status.style.display = "flex";
        };

        const busy = (on) => {
            saveButton.disabled = on;
            loadButton.disabled = on;
        };

        saveButton.addEventListener("click", async () => {
            busy(true);
            show("Checking", '<i class="fas fa-spinner fa-spin"></i><span>Packing up your backup...</span>');

            try {
                const backup = await buildBackup();
                const blob = new Blob([JSON.stringify(backup)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                const date = new Date().toISOString().slice(0, 10);

                a.href = url;
                a.download = `FlockMod-Themer-backup-${date}.json`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(url), 10000);

                const mb = (blob.size / (1024 * 1024)).toFixed(blob.size > 1024 * 1024 ? 1 : 2);
                show("Current", `<i class="fas fa-check-circle"></i><span>Backup saved (${mb} MB). Keep the file somewhere safe.</span>`);
            } catch (error) {
                show("Error", '<i class="fas fa-exclamation-circle"></i><span>Couldn\'t make the backup. Try again, or free up some space if your disk is full.</span>');
            } finally {
                busy(false);
            }
        });

        loadButton.addEventListener("click", () => {
            fileInput.value = "";
            fileInput.click();
        });

        fileInput.addEventListener("change", async () => {
            const file = fileInput.files && fileInput.files[0];

            if (!file) {
                return;
            }

            let backup;

            try {
                backup = JSON.parse(await file.text());
            } catch (error) {
                backup = null;
            }

            if (!backup || backup.app !== "FlockMod Themer" || backup.kind !== "backup" || typeof backup.localStorage !== "object") {
                show("Error", '<i class="fas fa-exclamation-circle"></i><span>That file isn\'t a FlockMod Themer backup.</span>');
                return;
            }

            const when = backup.created ? new Date(backup.created).toLocaleDateString() : "an unknown date";

            /* Ask before replacing everything (no browser popups) */
            show("Available", `
                <i class="fas fa-exclamation-triangle"></i>
                <span>Load the backup from ${when} (v${backup.modVersion || "?"})? It replaces all your current mod settings, themes, images, sounds and fonts.</span>
                <span class="themeModBackupConfirm">
                    <button type="button" class="themeModButton" data-act="cancel">Cancel</button>
                    <button type="button" class="themeModButton themeModBackupReplace" data-act="replace">Replace everything</button>
                </span>`);

            status.querySelector('[data-act="cancel"]').addEventListener("click", () => {
                status.style.display = "none";
            });

            status.querySelector('[data-act="replace"]').addEventListener("click", async () => {
                busy(true);
                show("Checking", '<i class="fas fa-spinner fa-spin"></i><span>Loading your backup...</span>');

                try {
                    await restoreBackup(backup);

                    /* The open menu still holds the old values, so don't
                       let Apply write them back over the backup */
                    const apply = dialog.querySelector(".themeModApplyButton");

                    if (apply) {
                        apply.disabled = true;
                        apply.title = "Refresh FlockMod to finish loading your backup";
                    }

                    show("Current", `
                        <i class="fas fa-check-circle"></i>
                        <span>Backup loaded! Refresh FlockMod to see everything.</span>
                        <span class="themeModBackupConfirm">
                            <button type="button" class="themeModButton themeModBackupReplace" data-act="refresh">Refresh now</button>
                        </span>`);

                    status.querySelector('[data-act="refresh"]').addEventListener("click", () => {
                        location.reload();
                    });
                } catch (error) {
                    show("Error", '<i class="fas fa-exclamation-circle"></i><span>Something went wrong while loading the backup. Refresh FlockMod and try again.</span>');
                    busy(false);
                }
            });
        });
    }

    /* =========================================================
       QUICK TOUR (sakura pink)
       The first time the mod menu opens, a small card docked on
       top of it asks if you'd like a tour. The tour is 6 short
       steps shown in a card beside the menu (or on top of it when
       there's no room beside), with a pink glow around whatever
       the step is about. Skip is on every step, and General >
       Quick tour replays it.
       Nothing runs while the tour is closed: the observers and
       listeners are only attached while a card is showing.
       ========================================================= */

    const TOUR_SEEN_LS = "flockmodTourSeen";

    /* Same 5-petal flower as the bloom switch thumb */
    const TOUR_FLOWER_HTML = '<span class="fmTourFlower" aria-hidden="true"></span>';

    /* Small helpers the tours use to find things */
    function tourOpenTab(dialog, name) {
        return () => {
            const button = dialog.querySelector(`.themeModSidebarItem[data-theme-section="${name}"]`);

            if (button && !button.classList.contains("active")) {
                button.click();
            }
        };
    }

    function tourPanel(dialog, name) {
        return dialog.querySelector(`.themeModSectionContent[data-theme-panel="${name}"]`);
    }

    /* The setting row (in one tab) whose name starts with the given text */
    function tourRow(dialog, panelName, nameText) {
        return () => {
            const panel = tourPanel(dialog, panelName);

            if (!panel) {
                return null;
            }

            const want = nameText.toLowerCase();

            return Array.from(panel.querySelectorAll(".themeModSetting")).find((row) => {
                const n = row.querySelector(".themeModSettingName");
                return n && n.textContent.trim().toLowerCase().startsWith(want) && row.offsetParent !== null;
            }) || null;
        };
    }

    function tourTitle(dialog, panelName, titleText) {
        return () => {
            const panel = tourPanel(dialog, panelName);
            const want = titleText.toLowerCase();

            return panel
                ? Array.from(panel.querySelectorAll(".themeModSubsectionTitle")).find((el) =>
                    el.textContent.trim().toLowerCase().startsWith(want) && el.offsetParent !== null) || null
                : null;
        };
    }

    function tourEl(dialog, selector) {
        return () => {
            const found = Array.from(dialog.querySelectorAll(selector)).find((el) => el.offsetParent !== null);
            return found || null;
        };
    }

    /* ---- The first-open tour: the highlights, a stop at each big feature ---- */
    function getTourSteps(dialog) {
        const openTab = (name) => tourOpenTab(dialog, name);

        const rowOf = (selector) => () => {
            const el = dialog.querySelector(selector);
            return el ? (el.closest(".themeModSetting") || el) : null;
        };

        return [
            {
                icon: "fa-power-off",
                title: "Your on/off switch",
                text: "Turns every customization on or off at once. Handy for comparing with plain FlockMod.",
                before: openTab("general"),
                target: rowOf("#themeModEnabled")
            },
            {
                icon: "fa-seedling",
                title: "Simple coloring",
                text: "Pick just a few main colors and the mod fills in the rest. Your detailed colors are kept for later.",
                before: openTab("general"),
                target: rowOf("#themeModSimpleMode")
            },
            {
                icon: "fa-palette",
                title: "Colors",
                text: "Every part of FlockMod lives here. Tap a chip to jump to a section, and \u21BA resets just that section.",
                before: openTab("colors"),
                target: () => dialog.querySelector(".themeModJumpBar")
            },
            {
                icon: "fa-search",
                title: "Can't find something?",
                text: "Search looks through every tab at once. Try typing \u201Cchat\u201D or \u201Cfont\u201D.",
                before: openTab("colors"),
                target: () => dialog.querySelector(".themeModSearch")
            },
            {
                icon: "fa-swatchbook",
                title: "Themes",
                text: "Save your looks, try a preset, or share a theme code with friends.",
                before: openTab("themes"),
                target: () => dialog.querySelector('.themeModSidebarItem[data-theme-section="themes"]')
            },
            {
                icon: "fa-shield-alt",
                title: "Safety",
                text: "Flags possible griefers in the user list and chat. Everything stays on your computer.",
                before: openTab("safety"),
                target: () => dialog.querySelector('.themeModSidebarItem[data-theme-section="safety"]')
            },
            {
                icon: "fa-images",
                title: "Reference window",
                text: "This button opens a window for your reference images. Only you can see it, and it has its own \u24D8 tour.",
                before: () => {},
                target: () => document.querySelector(REF_BUTTON_SELECTOR)
            },
            {
                icon: "fa-sync-alt",
                title: "Updates",
                text: "The mod checks GitHub for updates once a day. A pink dot on the flower means a new version is out, and What's new shows what changed.",
                before: openTab("general"),
                target: rowOf("#themeModAutoUpdate")
            },
            {
                icon: "fa-bug",
                title: "Found a bug?",
                text: "Report a bug opens a ready-made report with your mod version filled in. Your backup file and the download page are here too.",
                before: openTab("general"),
                target: () => {
                    const bug = [...dialog.querySelectorAll("a .fa-bug")].map((i) => i.closest("a")).find(Boolean);
                    return bug ? (bug.closest(".themeModSetting") || bug) : null;
                }
            },
            {
                icon: "fa-info-circle",
                title: "A tour for every tab",
                text: "Interface, Animations, Sounds, Backgrounds and the rest each have their own quick tour. Press \u24D8 up here on any tab.",
                before: openTab("general"),
                target: () => dialog.querySelector(".themeModPanelHelp")
            },
            {
                icon: "fa-check",
                title: "Keep your changes",
                text: "Nothing is saved until you press Apply Changes. Close the menu to undo anything you haven't applied.",
                before: openTab("colors"),
                target: () => dialog.querySelector(".themeModApplyButton")
            }
        ];
    }

    /* ---- Short tours for each tab (the \u24D8 button in the header) ---- */
    function getPanelTourSteps(dialog, section) {
        const open = tourOpenTab(dialog, section);
        const row = (text) => tourRow(dialog, section, text);
        const title = (text) => tourTitle(dialog, section, text);
        const el = (selector) => tourEl(dialog, `.themeModSectionContent[data-theme-panel="${section}"] ${selector}`);
        const simple = dialog.classList.contains("themeModSimpleMode");
        const step = (icon, stepTitle, text, target) => ({ icon, title: stepTitle, text, before: open, target });

        const tours = {
            general: [
                step("fa-power-off", "On/off switch", "Turns all your customizations on or off at once.", row("Enable customizations")),
                step("fa-seedling", "Simple coloring", "A few main colors fill in everything else. Your detailed colors are kept.", row("Simple coloring")),
                step("fa-sliders-h", "Options", "Ask before closing reminds you to apply, and Lite mode turns off heavy extras on slower computers.", row("Lite mode")),
                step("fa-play", "Tours", "Show welcome brings back the first popup, Replay tour starts the main tour.", row("Quick tour")),
                step("fa-sync-alt", "Updates", "See your version, what's new, and check GitHub for a newer one. Automatic checks show a pink dot on the flower.", row("Version")),
                step("fa-download", "Backup", "Save everything to one file and load it on another browser or computer.", row("Full backup file")),
                step("fa-bug", "Help", "Get the latest version, or report a bug. The report fills in your mod version for you.", row("Links"))
            ],
            interface: [
                step("fa-font", "Font", "Change the font, its size and weight. You can add any Google Font by name, or upload your own.", title("Font")),
                step("fa-arrows-alt-v", "Spacing and corners", "Make FlockMod roomier or more compact, and round the corners of buttons and boxes.", title("Spacing")),
                step("fa-heart", "Slider thumbs", "Turn slider and switch thumbs into shapes like hearts, stars or cats.", title("Slider Thumbs")),
                step("fa-cat", "Popup decorations", "Ears, tails, flowers and more on every popup. Click a tile to try one, and use the chips to show Cute, Dark or Neutral styles.", el(".fmStylePick")),
                step("fa-comment-dots", "Chat bubbles", "Put chat in bubbles, with your own messages in a special style. Only you see it.", title("Chat Bubbles")),
                step("fa-link", "Match them", "With this ON, picking a style for popups also picks it for bubbles, and the other way around.", row("Match popups")),
                step("fa-highlighter", "Chat highlights", "Lines that mention your name light up in chat and Messenger.", row("Highlight mentions")),
                step("fa-clock", "Clock & time", "The clock next to the flower, your time on FlockMod, and a gentle break reminder.", title("Clock")),
                step("fa-undo-alt", "Reset one part", "\u21BA next to a section title resets just that section.", el(".themeModSubsectionReset"))
            ],
            colors: simple ? [
                step("fa-seedling", "Simple colors", "You're in simple coloring. These few colors fill in the whole theme.", title("Simple Colors")),
                step("fa-toggle-on", "ON + color", "Switch a color ON, then pick it. OFF keeps FlockMod's own color.", el(".themeModSimpleColors .themeModSetting")),
                step("fa-layer-group", "Want more control?", "Copy to detailed turns these into detailed colors you can fine-tune.", () => dialog.querySelector(".themeModCopyToDetailed")),
                step("fa-check", "Apply", "Press Apply Changes to keep your colors.", () => dialog.querySelector(".themeModApplyButton"))
            ] : [
                step("fa-toggle-on", "ON + color", "Each color has a switch and a picker. Switch it ON, then pick. OFF keeps FlockMod's own color.", row("Text Color 1")),
                step("fa-map-signs", "Jump around", "The chips up top jump to Sidebar, Top Bar, Chat and more.", () => dialog.querySelector(".themeModJumpBar")),
                step("fa-fill-drip", "Gradients", "Some colors have a small Gradient button. Turn it on (with the color ON) to blend into a second color and pick its direction.", el(".fmGradPill")),
                step("fa-undo-alt", "Reset one part", "\u21BA next to a section title resets just that section.", el(".themeModSubsectionReset")),
                step("fa-chevron-down", "Fold sections", "Click a section title (or its arrow) to fold it away. The menu remembers which ones you folded.", el(".fmFoldButton")),
                step("fa-check", "Apply", "Press Apply Changes to keep your colors. A pink note reminds you when something isn't applied yet.", () => dialog.querySelector(".themeModApplyButton"))
            ],
            themes: [
                step("fa-share-alt", "Share a theme", "Copy code gives you a theme code for friends. Paste someone's code below and press Import.", row("Export theme")),
                step("fa-bookmark", "My Themes", "Save your current look with a name, then load it again anytime. Your background images are saved with it.", row("Save current theme")),
                step("fa-swatchbook", "Presets", "Ready-made looks to start from. Calm Night is extra gentle on sensitive eyes.", title("Presets")),
                step("fa-undo", "Undo", "Loaded a theme by mistake? An Undo button shows up at the top right after.",
                    () => tourEl(dialog, '.themeModSectionContent[data-theme-panel="themes"] .themeModUndoRow')() || title("Share")())
            ],
            animations: [
                step("fa-magic", "Animations", "Turn the mod's little effects on or off, and set how fast they play.", title("Animations")),
                step("fa-sliders-h", "Pick your effects", "Choose exactly which effects you like. Every effect plays once and stops, so nothing slows your drawing.", title("Effects"))
            ],
            sounds: [
                step("fa-volume-up", "Sounds", "Turn notification sounds on, set the volume, and stay quiet while you draw.", title("Sounds")),
                step("fa-at", "Mention words", "Extra words (like your nickname) that count as a mention.", row("Extra mention words")),
                step("fa-bell", "Events", "Pick a sound for each event and press \u25B6 to hear it.", title("Events")),
                step("fa-upload", "Your sounds", "Upload your own sounds to use for any event. They stay in this browser.", title("Your Sounds")),
                step("fa-undo-alt", "Reset one part", "\u21BA next to a section title resets just that section.", el(".themeModSubsectionReset"))
            ],
            safety: [
                step("fa-shield-alt", "Troll detection", "Flags people who seem to be griefing: their name turns red in the user list and chat.", title("Troll Detection")),
                step("fa-clock", "Timing", "How quickly someone gets flagged, and how long their name stays red.", title("Timing")),
                step("fa-eye", "Watch for", "Pick which kinds of griefing count, like big erasing or scribbling.", title("Watch For")),
                step("fa-bell", "Warnings", "The popup, how often it can repeat, and the highlight color. It's all local and only you see it.", title("Warnings"))
            ],
            backgrounds: [
                step("fa-image", "Background images", "Put your own image behind the sidebar, chat, messenger or around the canvas.", row("Sidebar Background Image")),
                step("fa-adjust", "See-through", "Let the image show through the boxes on top of it, and fine-tune how it fits.", title("Sidebar")),
                step("fa-lock", "Only on your computer", "Images are saved in this browser only. Nobody else sees them.", el(".themeModLocalNote"))
            ]
        };

        return tours[section] || tours.general;
    }

    /* opts (all optional, defaults = the mod menu's tour):
       steps, seenKey, title, text, replayButton, welcomeButton */
    function setupTour(dialog, opts = {}) {
        const defaultSteps = opts.steps || getTourSteps(dialog);
        let steps = defaultSteps;
        const seenKey = opts.seenKey || TOUR_SEEN_LS;
        const promptTitle = opts.title || "Welcome to FlockTheme!";
        const promptText = opts.text || "Would you like a quick tour? It takes about 30 seconds.";
        let card = null;
        let ring = null;
        let mode = null;        /* "prompt" | "step" | null */
        let step = 0;
        let queued = false;
        let moveObserver = null;
        let sizeObserver = null;

        const build = (html) => {
            const holder = document.createElement("div");
            holder.innerHTML = html.trim();
            return holder.firstChild;
        };

        /* ---- Follow the menu while it's dragged or resized ---- */
        const queuePlace = () => {
            if (queued) {
                return;
            }

            queued = true;
            requestAnimationFrame(() => {
                queued = false;
                place();
            });
        };

        function watch() {
            if (moveObserver) {
                return;
            }

            moveObserver = new MutationObserver(queuePlace);
            moveObserver.observe(dialog, { attributes: true, attributeFilter: ["style", "class"] });

            if (window.ResizeObserver) {
                sizeObserver = new ResizeObserver(queuePlace);
                sizeObserver.observe(dialog);
            }

            window.addEventListener("resize", queuePlace);
            dialog.querySelector(".themeModSectionsScroll")
                ?.addEventListener("scroll", queuePlace, { passive: true });
        }

        function unwatch() {
            moveObserver?.disconnect();
            sizeObserver?.disconnect();
            moveObserver = sizeObserver = null;
            window.removeEventListener("resize", queuePlace);
            dialog.querySelector(".themeModSectionsScroll")
                ?.removeEventListener("scroll", queuePlace);
        }

        /* Folded cards hide their rows, so a step pointing inside one
           found nothing and lit up the whole menu. Now the tour opens
           just that card while the step is shown (without changing
           which cards you folded), and closes it again afterwards. */
        let peeked = [];

        function clearPeek() {
            peeked.forEach((el) => el.classList.add("fmFoldHidden"));
            peeked = [];
        }

        /* v1.6.3: a step's target can sit inside a folded card. The tour
           opens just that card while the step shows (your folds are kept
           and come back afterwards). A target that's a card's title opens
           the card too, so you see what the step is about. */
        const isShown = (el) => Boolean(el) && el.getClientRects().length > 0;

        function peekCard(head) {
            if (!head || !head.classList.contains("fmFolded")) {
                return;
            }

            let n = head.nextElementSibling;

            while (n && !n.classList.contains("fmCardHead")) {
                if (n.classList.contains("fmFoldHidden")) {
                    n.classList.remove("fmFoldHidden");
                    peeked.push(n);
                }
                n = n.nextElementSibling;
            }
        }

        function cardHeadOf(el) {
            if (!el) return null;
            const own = el.closest(".fmCardHead");
            if (own) return own;

            let item = el;
            while (item && !item.classList.contains("fmCardItem")) {
                item = item.parentElement;
            }

            let head = item;
            while (head && !head.classList.contains("fmCardHead")) {
                head = head.previousElementSibling;
            }

            return head;
        }

        function findTarget(s) {
            clearPeek();
            let target = s.target();

            if (isShown(target)) {
                peekCard(target.closest(".fmCardHead"));
                return target;
            }

            /* not visible yet: look again with every folded row showing,
               then keep only the card that holds the target */
            const hidden = Array.from(dialog.querySelectorAll(".fmFoldHidden"));
            hidden.forEach((el) => el.classList.remove("fmFoldHidden"));
            target = s.target();
            hidden.forEach((el) => el.classList.add("fmFoldHidden"));

            if (!target) {
                return null;
            }

            peekCard(cardHeadOf(target));
            return isShown(target) ? target : null;
        }

        function closeTour() {
            clearPeek();
            card?.remove();
            ring?.remove();
            card = ring = null;
            mode = null;
            unwatch();
        }

        function markSeen() {
            localStorage.setItem(seenKey, "true");
        }

        /* ---- Welcome prompt ---- */
        function showPrompt() {
            closeTour();
            mode = "prompt";

            card = build(`
                <div class="fmTour fmTourPrompt" role="dialog" aria-label="Mod tour">
                    ${TOUR_FLOWER_HTML}
                    <div class="fmTourBody">
                        <div class="fmTourTitle">${promptTitle}</div>
                        <div class="fmTourText">${promptText}</div>
                    </div>
                    <div class="fmTourButtons">
                        <button type="button" class="fmTourBtn fmTourGhost" data-act="no">No thanks</button>
                        <button type="button" class="fmTourBtn fmTourMain" data-act="yes">Yes, show me</button>
                    </div>
                </div>`);

            document.body.appendChild(card);

            card.querySelector('[data-act="no"]').addEventListener("click", () => {
                markSeen();
                closeTour();
            });

            card.querySelector('[data-act="yes"]').addEventListener("click", () => {
                markSeen();
                startTour();
            });

            watch();
            place();
        }

        /* ---- Steps ---- */
        /* customSteps: a different (e.g. per-tab) tour on the same engine */
        function startTour(customSteps) {
            closeTour();
            mode = "step";
            steps = Array.isArray(customSteps) && customSteps.length ? customSteps : defaultSteps;

            ring = build('<div class="fmTourRing" aria-hidden="true"></div>');
            card = build(`
                <div class="fmTour fmTourStep" role="dialog" aria-label="Mod tour" aria-live="polite">
                    <div class="fmTourHead">
                        <span class="fmTourIcon"><i class="fas"></i></span>
                        <span class="fmTourTitle"></span>
                        <button type="button" class="fmTourSkip" data-act="skip">Skip tour</button>
                    </div>
                    <div class="fmTourText"></div>
                    <div class="fmTourFoot">
                        <div class="fmTourDots"></div>
                        <button type="button" class="fmTourBtn fmTourGhost" data-act="back">Back</button>
                        <button type="button" class="fmTourBtn fmTourMain" data-act="next">Next</button>
                    </div>
                </div>`);

            document.body.appendChild(ring);
            document.body.appendChild(card);

            card.querySelector('[data-act="skip"]').addEventListener("click", closeTour);
            card.querySelector('[data-act="back"]').addEventListener("click", () => goTo(step - 1));
            card.querySelector('[data-act="next"]').addEventListener("click", () => {
                if (step >= steps.length - 1) {
                    closeTour();
                } else {
                    goTo(step + 1);
                }
            });

            watch();
            goTo(0);
        }

        function goTo(index) {
            if (!card) {
                return;
            }

            step = Math.max(0, Math.min(steps.length - 1, index));
            const s = steps[step];

            /* If search is open, close it so the tabs show normally */
            if (dialog.classList.contains("themeModSearching")) {
                const input = dialog.querySelector(".themeModSearchInput");

                if (input) {
                    input.value = "";
                    input.dispatchEvent(new Event("input", { bubbles: true }));
                }
            }

            s.before();

            card.querySelector(".fmTourIcon i").className = `fas ${s.icon}`;
            card.querySelector(".fmTourTitle").textContent = s.title;
            card.querySelector(".fmTourText").textContent = s.text;
            card.querySelector(".fmTourDots").innerHTML = steps.map((_, n) =>
                `<span class="${n === step ? "on" : n < step ? "done" : ""}"></span>`
            ).join("");
            card.querySelector('[data-act="back"]').style.visibility = step ? "visible" : "hidden";
            card.querySelector('[data-act="next"]').textContent =
                step === steps.length - 1 ? "Done" : "Next";

            const target = findTarget(s);

            if (target) {
                target.scrollIntoView({ block: "nearest" });
            }

            requestAnimationFrame(() => {
                place();

                if (ring) {
                    ring.classList.remove("fmTourPulse");
                    void ring.offsetWidth;
                    ring.classList.add("fmTourPulse");
                }
            });
        }

        /* ---- Positioning ---- */
        function place() {
            if (!card) {
                return;
            }

            /* Menu closed some other way: tidy up */
            if (!dialog.isConnected) {
                closeTour();
                return;
            }

            const m = dialog.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const gap = 14;

            if (mode === "prompt") {
                const width = Math.min(560, Math.max(280, m.width - 40), vw - 16);
                card.style.width = `${width}px`;
                card.classList.toggle("fmTourPromptNarrow", width < 440);

                const left = Math.min(Math.max(8, m.left + (m.width - width) / 2), vw - width - 8);
                const aboveTop = m.top - card.offsetHeight - 12;

                /* No room above the menu: tuck it just inside the top */
                card.classList.toggle("fmTourInside", aboveTop < 8);
                card.style.left = `${left}px`;
                card.style.top = `${aboveTop < 8 ? m.top + 44 : aboveTop}px`;
                card.style.setProperty("--fm-arrow-x", `${Math.min(Math.max(20, m.left + m.width / 2 - left), width - 20)}px`);
                return;
            }

            const target = steps[step].target();
            let t = target ? target.getBoundingClientRect() : null;

            if (!t || (t.width === 0 && t.height === 0)) {
                t = m;
            }

            /* Something outside the window (e.g. a bottom bar button):
               glow around it and put the card right above it */
            if (target && !dialog.contains(target) && t !== m) {
                const pad = 5;

                Object.assign(ring.style, {
                    left: `${t.left - pad}px`,
                    top: `${t.top - pad}px`,
                    width: `${t.width + pad * 2}px`,
                    height: `${t.height + pad * 2}px`
                });

                const cw = card.offsetWidth;
                const ch = card.offsetHeight;
                const x = Math.min(Math.max(8, t.left + t.width / 2 - cw / 2), vw - cw - 8);
                const above = t.top - ch - 14;

                card.classList.remove("fmArrowLeft", "fmArrowRight", "fmArrowDown", "fmTourInside");
                card.style.left = `${x}px`;
                card.style.top = `${above >= 8 ? above : Math.min(t.bottom + 14, vh - ch - 8)}px`;
                card.classList.toggle("fmArrowDown", above >= 8);
                card.style.setProperty("--fm-arrow-x", `${Math.min(Math.max(20, t.left + t.width / 2 - x), cw - 20)}px`);
                return;
            }

            /* Keep the glow inside the menu (the target may be scrolled out) */
            const pad = 5;
            const top = Math.max(m.top, t.top - pad);
            const bottom = Math.min(m.bottom, t.bottom + pad);
            const left = Math.max(m.left, t.left - pad);
            const right = Math.min(m.right, t.right + pad);

            Object.assign(ring.style, {
                left: `${left}px`,
                top: `${top}px`,
                width: `${Math.max(0, right - left)}px`,
                height: `${Math.max(0, bottom - top)}px`
            });

            const cw = card.offsetWidth;
            const ch = card.offsetHeight;
            const roomRight = vw - m.right;
            const roomLeft = m.left;

            card.classList.remove("fmArrowLeft", "fmArrowRight", "fmArrowDown", "fmTourInside");

            if (roomRight >= cw + gap + 8 || roomLeft >= cw + gap + 8) {
                const onRight = roomRight >= cw + gap + 8;
                const middle = t.top + t.height / 2;
                const y = Math.min(Math.max(8, middle - ch / 2), vh - ch - 8);

                card.style.left = `${onRight ? m.right + gap : m.left - cw - gap}px`;
                card.style.top = `${y}px`;
                card.classList.add(onRight ? "fmArrowLeft" : "fmArrowRight");
                card.style.setProperty("--fm-arrow-y", `${Math.min(Math.max(18, middle - y), ch - 18)}px`);
            } else {
                /* Menu fills the screen sideways: dock on top instead */
                const x = Math.min(Math.max(8, m.left + (m.width - cw) / 2), vw - cw - 8);
                const aboveTop = m.top - ch - 12;
                const inside = aboveTop < 8;

                card.style.left = `${x}px`;
                /* Inside the menu: sit at whichever end is away from the glow */
                const lowTarget = t.top + t.height / 2 > m.top + m.height / 2;
                const insideTop = lowTarget ? m.top + 50 : m.bottom - ch - 60;

                card.style.top = `${inside ? insideTop : aboveTop}px`;
                card.classList.add(inside ? "fmTourInside" : "fmArrowDown");
                card.style.setProperty("--fm-arrow-x", `${Math.min(Math.max(20, m.left + m.width / 2 - x), cw - 20)}px`);
            }
        }

        /* ---- Wiring ---- */
        dialog.querySelector(opts.replayButton || ".themeModTourButton")?.addEventListener("click", (event) => {
            event.preventDefault();
            startTour();
        });
        dialog.querySelector(opts.welcomeButton || ".themeModTourWelcomeButton")?.addEventListener("click", (event) => {
            event.preventDefault();
            showPrompt();
        });
        dialog.querySelector(".closeButton")?.addEventListener("click", closeTour);

        /* Lets the window close the tour when it's closed another way,
           and lets other buttons start a different tour on it */
        dialog._closeTour = closeTour;
        dialog._startTour = startTour;

        if (localStorage.getItem(seenKey) !== "true") {
            /* Let the menu finish opening first */
            setTimeout(() => {
                if (dialog.isConnected && !card) {
                    showPrompt();
                }
            }, 350);
        }
    }

    function setupDragging(dialog) {
        const titleBar =
            dialog.querySelector(
                ".dialogTitlebar"
            );

        let dragging = false;
        let startX = 0;
        let startY = 0;
        let startLeft = 0;
        let startTop = 0;

        titleBar.addEventListener(
            "pointerdown",
            (event) => {

                if (
                    event.target.closest(
                        ".closeButton, .dialogTitleButtons a, button"
                    )
                ) {
                    return;
                }

                dragging = true;

                startX =
                    event.clientX;

                startY =
                    event.clientY;

                startLeft =
                    dialog.offsetLeft;

                startTop =
                    dialog.offsetTop;

                titleBar.setPointerCapture(
                    event.pointerId
                );
            }
        );

        titleBar.addEventListener(
            "pointermove",
            (event) => {

                if (!dragging) {
                    return;
                }

                const dx =
                    event.clientX -
                    startX;

                const dy =
                    event.clientY -
                    startY;

                let newLeft =
                    startLeft + dx;

                let newTop =
                    startTop + dy;

                const screenWidth =
                    window.innerWidth;

                const screenHeight =
                    window.innerHeight;

                const dialogWidth =
                    dialog.offsetWidth;

                const dialogHeight =
                    dialog.offsetHeight;

                const minLeft =
                    0;

                const maxLeft =
                    screenWidth -
                    dialogWidth;

                const minTop =
                    0;

                const maxTop =
                    screenHeight -
                    dialogHeight;

                newLeft =
                    Math.max(
                        minLeft,
                        Math.min(
                            newLeft,
                            maxLeft
                        )
                    );

                newTop =
                    Math.max(
                        minTop,
                        Math.min(
                            newTop,
                            maxTop
                        )
                    );

                dialog.style.left =
                    `${newLeft}px`;

                dialog.style.top =
                    `${newTop}px`;
            }
        );

        titleBar.addEventListener(
            "pointerup",
            () => {
                dragging = false;
            }
        );

        titleBar.addEventListener(
            "pointercancel",
            () => {
                dragging = false;
            }
        );
    }

    function setupResizing(dialog, minWidth = 400, minHeight = 300) {

        function setupHandle(
            handle,
            direction
        ) {
            let resizing = false;

            let startX;
            let startY;
            let startWidth;
            let startHeight;
            let startLeft;
            let startTop;

            handle.addEventListener(
                "pointerdown",
                (event) => {

                    event.preventDefault();

                    resizing = true;

                    startX =
                        event.clientX;

                    startY =
                        event.clientY;

                    startWidth =
                        dialog.offsetWidth;

                    startHeight =
                        dialog.offsetHeight;

                    startLeft =
                        dialog.offsetLeft;

                    startTop =
                        dialog.offsetTop;

                    handle.setPointerCapture(
                        event.pointerId
                    );
                }
            );

            handle.addEventListener(
                "pointermove",
                (event) => {

                    if (!resizing) {
                        return;
                    }

                    const dx =
                        event.clientX -
                        startX;

                    const dy =
                        event.clientY -
                        startY;

                    let width =
                        startWidth;

                    let height =
                        startHeight;

                    let left =
                        startLeft;

                    let top =
                        startTop;

                    if (
                        direction.includes(
                            "right"
                        )
                    ) {
                        width =
                            Math.max(
                                minWidth,
                                startWidth +
                                dx
                            );
                    }

                    if (
                        direction.includes(
                            "left"
                        )
                    ) {
                        width =
                            Math.max(
                                minWidth,
                                startWidth -
                                dx
                            );

                        if (
                            width >
                            minWidth
                        ) {
                            left =
                                startLeft +
                                dx;
                        } else {
                            left =
                                startLeft +
                                (
                                    startWidth -
                                    minWidth
                                );
                        }
                    }

                    if (
                        direction.includes(
                            "bottom"
                        )
                    ) {
                        height =
                            Math.max(
                                minHeight,
                                startHeight +
                                dy
                            );
                    }

                    if (
                        direction.includes(
                            "top"
                        )
                    ) {
                        height =
                            Math.max(
                                minHeight,
                                startHeight -
                                dy
                            );

                        if (
                            height >
                            minHeight
                        ) {
                            top =
                                startTop +
                                dy;
                        } else {
                            top =
                                startTop +
                                (
                                    startHeight -
                                    minHeight
                                );
                        }
                    }

                    dialog.style.width =
                        `${width}px`;

                    dialog.style.height =
                        `${height}px`;

                    if (
                        direction.includes(
                            "left"
                        )
                    ) {
                        dialog.style.left =
                            `${left}px`;
                    }

                    if (
                        direction.includes(
                            "top"
                        )
                    ) {
                        dialog.style.top =
                            `${top}px`;
                    }
                }
            );

            handle.addEventListener(
                "pointerup",
                () => {
                    resizing = false;
                }
            );

            handle.addEventListener(
                "pointercancel",
                () => {
                    resizing = false;
                }
            );
        }

        setupHandle(
            dialog.querySelector(".sbTop"),
            "top"
        );

        setupHandle(
            dialog.querySelector(".sbBottom"),
            "bottom"
        );

        setupHandle(
            dialog.querySelector(".sbLeft"),
            "left"
        );

        setupHandle(
            dialog.querySelector(".sbRight"),
            "right"
        );

        setupHandle(
            dialog.querySelector(".sbTopLeft"),
            "top left"
        );

        setupHandle(
            dialog.querySelector(".sbTopRight"),
            "top right"
        );

        setupHandle(
            dialog.querySelector(".sbBottomLeft"),
            "bottom left"
        );

        setupHandle(
            dialog.querySelector(".sbBottomRight"),
            "bottom right"
        );
    }

    function setupCloseButton(dialog) {
        const closeButton =
            dialog.querySelector(
                ".closeButton"
            );

        closeButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const savedFont =
                    localStorage.getItem(
                        "flockmodCustomUIFont"
                    ) || "default";

                const savedFontSize =
                    localStorage.getItem(
                        "flockmodCustomUIFontSize"
                    ) || "100";

                const savedFontWeight =
                    localStorage.getItem(
                        "flockmodCustomUIFontWeight"
                    ) || "regular";

                const savedSpacing =
                    localStorage.getItem(
                        "flockmodCustomUISpacing"
                    ) || "100";
                    
                    const savedRadius =
                    localStorage.getItem(
                        "flockmodCustomUIRadius"
                    ) || "5";
            
                applyFontValue(savedFont);

                applyFontSizePreview(
                    savedFontSize
                );

                applyFontWeightPreview(
                    savedFontWeight
                );

                applySpacingPreview(
                    savedSpacing
                );

                const backdrop =
                    document.querySelector(
                        ".themeModBackdrop"
                    );

                if (backdrop) {
                    backdrop.remove();
                }

                applyRadiusPreview(
                    savedRadius
                );

                const savedSelected2 =
                    localStorage.getItem(
                        "flockmodCustomSelectedColor"
                    ) || "#4f5156";

                applySelectedColorPreview(
                    savedSelected2
                );

                const savedHover2 =
                    localStorage.getItem(
                        "flockmodCustomHoverColor"
                    ) || "#4f5156";

                applyHoverColorPreview(
                    savedHover2
                );

                applySelectedEnabledPreview(
                    isSavedOnByDefault("flockmodCustomSelectedColorEnabled")
                );

                applyHoverEnabledPreview(
                    isSavedOnByDefault("flockmodCustomHoverColorEnabled")
                );

                const savedText1Enabled2 =
                    localStorage.getItem(
                        "flockmodCustomText1ColorEnabled"
                    ) === "true";

                const savedText1Color2 =
                    localStorage.getItem(
                        "flockmodCustomText1Color"
                    ) || "#ffffff";

                applyText1ColorEnabledPreview(
                    savedText1Enabled2
                );

                applyText1ColorPreview(
                    savedText1Color2
                );

                const savedText2Enabled2 =
                    localStorage.getItem(
                        "flockmodCustomText2ColorEnabled"
                    ) === "true";

                const savedText2Color2 =
                    localStorage.getItem(
                        "flockmodCustomText2Color"
                    ) || "#ffffff";

                applyText2ColorEnabledPreview(
                    savedText2Enabled2
                );

                applyText2ColorPreview(
                    savedText2Color2
                );

                BAR_COLOR_SETTINGS.forEach((setting) => {
    const saved = getSavedTopBarColor(setting);
    applyTopBarColorPreview(setting, saved.enabled, saved.color);
});

                    TOGGLE_COLOR_SETTINGS.forEach((setting) => {
                    const saved = getSavedSidebarColor(setting);

                    applySidebarColorPreview(
                        setting,
                        saved.enabled,
                        saved.color
                    );
                });

                /* Simple mode (if saved on) sits on top of the detailed colors */
                applySavedSimpleColorsIfActive();
                applySavedGradients();
                applySavedAnimations();
                applySavedSounds();
                applySavedDeco();
                applySavedBubbles();
                applySavedTroll();
                rememberMenuRect(dialog);

                dialog.remove();
            }
        );
    }


    /* =========================================================
       COLORS PANEL LAYOUT (cards, folding, aligned controls,
       Gradient pills, group labels) + "Unsaved changes" note.
       Purely visual: it only adds classes and a few small
       elements around the existing rows, so every setting,
       search, the jump chips and the per-section resets work
       exactly as before.
       ========================================================= */

    const FOLDED_SECTIONS_LS = "flockmodMenuFoldedSections";

    /* Small labels that split long sections into groups:
       the row with this switch gets the label above it */
    const COLOR_GROUP_LABELS = {
        themeModText1ColorEnabled: "Text",
        themeModSelectedColorEnabled: "States",
        themeModSidebarPrimaryEnabled: "Backgrounds",
        themeModSidebarAccentEnabled: "Accents",
        themeModSidebarIconEnabled: "Icons",
        themeModTopBarBackgroundEnabled: "Bar",
        themeModTopBarTextColorEnabled: "Buttons",
        themeModTopBarBrandEnabled: "Extras",
        themeModPopupBackgroundEnabled: "Window",
        themeModPopupFieldEnabled: "Fields & buttons"
    };

    function readFoldedSections() {
        try {
            const list = JSON.parse(localStorage.getItem(FOLDED_SECTIONS_LS) || "[]");
            return new Set(Array.isArray(list) ? list : []);
        } catch (error) {
            return new Set();
        }
    }

    /* Cards for every settings tab that has sections. Colors also
       gets group labels, Gradient pills, "N settings · M on" counts
       and one-line descriptions. */
    const CARD_PANELS = ["general", "colors", "interface", "themes", "sounds", "safety", "backgrounds"];

    function enhanceCardsLayout(dialog) {
        CARD_PANELS.forEach((name) => enhancePanelCards(dialog, name));
        setupFoldAllButton(dialog);
    }

    /* One button next to ⓘ: folds every section of the open tab,
       or unfolds them all when everything is already folded */
    function setupFoldAllButton(dialog) {
        const help = dialog.querySelector(".themeModPanelHelp");

        if (!help || dialog.querySelector(".themeModFoldAll")) {
            return;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "themeModFoldAll";
        help.before(button);

        const currentPanel = () => [...dialog.querySelectorAll(".themeModSectionContent.fmCardsPanel")]
            .find((p) => getComputedStyle(p).display !== "none");

        const update = () => {
            const panel = currentPanel();
            const api = panel && panel._fmCards;

            button.style.display = api ? "" : "none";

            if (!api) {
                return;
            }

            const open = api.anyOpen();
            const label = open ? "Fold all sections" : "Unfold all sections";
            button.innerHTML = `<i class="fas ${open ? "fa-compress-alt" : "fa-expand-alt"}"></i>`;
            button.title = label;
            button.setAttribute("aria-label", label);
        };

        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const panel = currentPanel();

            if (panel && panel._fmCards) {
                panel._fmCards.setAll(panel._fmCards.anyOpen());
                update();
            }
        });

        dialog.addEventListener("click", () => requestAnimationFrame(update));
        update();
    }

    function enhancePanelCards(dialog, panelName) {
        const panel = dialog.querySelector(`.themeModSectionContent[data-theme-panel="${panelName}"]`);
        const isColors = panelName === "colors";

        if (!panel || panel.classList.contains("fmCardsPanel")) {
            return;
        }

        panel.classList.add("fmCardsPanel");
        panel.classList.toggle("fmCardsColors", isColors);

        const folded = readFoldedSections();
        const saveFolded = () => {
            localStorage.setItem(FOLDED_SECTIONS_LS, JSON.stringify([...folded]));
        };

        /* ---- group labels (Colors only) ---- */
        Object.entries(isColors ? COLOR_GROUP_LABELS : {}).forEach(([id, text]) => {
            const input = panel.querySelector(`#${id}`);
            const row = input && input.closest(".themeModSetting");

            if (row) {
                const label = document.createElement("div");
                label.className = "fmGroupLabel";
                label.textContent = text;
                row.before(label);
            }
        });

        /* ---- one-line descriptions: the full text shows on hover ---- */
        panel.querySelectorAll(isColors ? ".themeModSetting" : ":scope > .fmNothing").forEach((row) => {
            const text = row.querySelector(".themeModSettingText");
            const desc = row.querySelector(".themeModSettingDescription");

            if (text && desc) {
                text.title = desc.textContent.replace(/\s+/g, " ").trim();
            }
        });

        /* ---- Gradient pills: the gradient's own switch stays (hidden),
           the pill just flips it ---- */
        const gradients = [];

        panel.querySelectorAll(isColors ? ".themeModGradientRow" : ":scope > .fmNothing").forEach((gradRow) => {
            let mainRow = gradRow.previousElementSibling;

            while (mainRow && !mainRow.classList.contains("themeModSetting")) {
                mainRow = mainRow.previousElementSibling;
            }

            const gradToggle = gradRow.querySelector(".themeModToggle input");
            const mainToggle = mainRow && mainRow.querySelector(".themeModToggle input");
            const mainColor = mainRow && mainRow.querySelector(':scope > input[type="color"]');

            if (!gradToggle || !mainToggle) {
                return;
            }

            const pill = document.createElement("button");
            pill.type = "button";
            pill.className = "fmGradPill";
            pill.textContent = "Gradient";
            pill.title = "Blend this color into a second color";

            if (mainColor) {
                mainColor.before(pill);
            } else {
                mainRow.appendChild(pill);
            }

            pill.addEventListener("click", (event) => {
                event.preventDefault();
                gradToggle.checked = !gradToggle.checked;
                gradToggle.dispatchEvent(new Event("change", { bubbles: true }));
                refresh();
            });

            gradients.push({ gradRow, mainRow, gradToggle, mainToggle, pill });
        });

        /* ---- cards ---- */
        const cards = [];

        /* .fmNoCard titles (General > Thank You) keep their plain look */
        panel.querySelectorAll(".themeModSubsectionTitle:not(.fmNoCard)").forEach((title) => {
            const items = getSubsectionElements(title);
            let labelEl = title.querySelector(".themeModSubsectionLabel");

            /* Tabs without per-section resets: wrap the title text so it
               can be clicked to fold (chips still read the same text) */
            if (!labelEl) {
                labelEl = document.createElement("span");
                labelEl.className = "themeModSubsectionLabel";
                [...title.childNodes].forEach((n) => labelEl.appendChild(n));
                title.appendChild(labelEl);
            }

            const label = labelEl.textContent.replace(/\s+/g, " ").trim();
            const key = `${panelName}:${label}`;

            title.classList.add("fmCardHead");
            items.forEach((el) => el.classList.add("fmCardItem"));

            const fold = document.createElement("button");
            fold.type = "button";
            fold.className = "fmFoldButton";
            fold.title = "Fold / unfold this section";
            fold.setAttribute("aria-label", `Fold or unfold ${key}`);
            fold.innerHTML = '<i class="fas fa-chevron-down"></i>';
            title.appendChild(fold);

            const card = { title, items, key, label, labelEl, fold };
            cards.push(card);

            const toggleFold = (event) => {
                event.preventDefault();
                event.stopPropagation();
                setFolded(card, !title.classList.contains("fmFolded"));
                folded[title.classList.contains("fmFolded") ? "add" : "delete"](key);
                saveFolded();
                refresh();
            };

            fold.addEventListener("click", toggleFold);

            if (labelEl) {
                labelEl.classList.add("fmFoldable");
                labelEl.addEventListener("click", toggleFold);
            }

            setFolded(card, folded.has(key));
        });

        function setFolded(card, isFolded) {
            card.title.classList.toggle("fmFolded", isFolded);
            card.items.forEach((el) => el.classList.toggle("fmFoldHidden", isFolded));
            card.fold.setAttribute("aria-expanded", String(!isFolded));
        }

        /* Counts, pills, open gradients and which row closes each card */
        function refresh() {
            gradients.forEach(({ gradRow, mainRow, gradToggle, mainToggle, pill }) => {
                pill.classList.toggle("fmOn", gradToggle.checked);
                pill.classList.toggle("fmDim", !mainToggle.checked);
                pill.setAttribute("aria-pressed", String(gradToggle.checked));
                const open = gradToggle.checked && mainToggle.checked;
                gradRow.classList.toggle("fmGradOpen", open);
                mainRow.classList.toggle("fmHasGradOpen", open);
            });

            cards.forEach(({ title, items, labelEl }) => {
                const rows = items.filter((el) =>
                    el.classList.contains("themeModSetting") && !el.classList.contains("themeModGradientRow"));
                const switches = rows
                    .map((row) => row.querySelector(":scope > .themeModToggle input"))
                    .filter(Boolean);
                const on = switches.filter((input) => input.checked).length;

                if (isColors && labelEl && switches.length) {
                    labelEl.dataset.fmCount = `${switches.length} setting${switches.length === 1 ? "" : "s"} · ${on ? `${on} on` : "none on"}`;
                }

                let last = null;
                items.forEach((el) => {
                    el.classList.remove("fmCardLast");
                    if (getComputedStyle(el).display !== "none") {
                        last = el;
                    }
                });

                if (last) {
                    last.classList.add("fmCardLast");
                }

                title.classList.toggle("fmCardEmpty", !last);
            });
        }

        /* For the fold-all button */
        panel._fmCards = {
            anyOpen: () => cards.some((c) => c.title.offsetParent !== null && !c.title.classList.contains("fmFolded")),
            setAll(isFolded) {
                cards.forEach((c) => {
                    setFolded(c, isFolded);
                    folded[isFolded ? "add" : "delete"](c.key);
                });
                saveFolded();
                refresh();
            }
        };

        /* Opening a section from its jump chip unfolds it first
           (capture: runs before the chip scrolls) */
        const jumpBar = dialog.querySelector(".themeModJumpBar");

        if (jumpBar) {
            jumpBar.addEventListener("click", (event) => {
                const chip = event.target.closest(".themeModJumpChip");
                const card = chip && cards.find((c) => c.label === chip.textContent.trim() && c.title.offsetParent !== null);

                if (card && card.title.classList.contains("fmFolded")) {
                    setFolded(card, false);
                    folded.delete(card.key);
                    saveFolded();
                    refresh();
                }
            }, true);
        }

        /* Keep everything in sync. Resets change controls without
           events, so clicks re-check too (cheap: ~40 rows). */
        let queued = false;
        const queueRefresh = () => {
            if (!queued) {
                queued = true;
                requestAnimationFrame(() => {
                    queued = false;
                    refresh();
                });
            }
        };

        dialog.addEventListener("change", queueRefresh);
        dialog.addEventListener("click", queueRefresh);
        dialog.querySelector(".themeModSearchInput")?.addEventListener("input", queueRefresh);

        refresh();
    }

    /* v1.6.2: "You didn't apply your changes!" card. Closing the menu
       (X or the flower button) with unsaved changes asks first:
       Apply & close / Discard / Keep editing. Runs before every other
       close handler (capture on the dialog), so nothing is reverted
       until you choose. General > Ask before closing turns it off. */
    const ASK_CLOSE_LS = "flockmodAskBeforeClose";

    function setupCloseGuard(dialog) {
        const closeButton = dialog.querySelector(".closeButton");
        const apply = dialog.querySelector(".themeModApplyButton");
        const toggle = dialog.querySelector("#themeModAskClose");

        if (!closeButton || !apply) {
            return;
        }

        const askOn = () => localStorage.getItem(ASK_CLOSE_LS) !== "false";
        const setAsk = (on) => {
            localStorage.setItem(ASK_CLOSE_LS, String(on));
            if (toggle) toggle.checked = on;
        };

        if (toggle) {
            toggle.checked = askOn();
            toggle.addEventListener("change", () => setAsk(toggle.checked));
        }

        let card = null;
        let letThrough = false;

        const closeCard = () => {
            card?.remove();
            card = null;
        };

        const reallyClose = () => {
            closeCard();
            letThrough = true;
            closeButton.click();
            letThrough = false;
        };

        const openCard = () => {
            closeCard();

            card = document.createElement("div");
            card.className = "fmWhatsNew fmCloseAsk";
            card.setAttribute("role", "alertdialog");
            card.setAttribute("aria-label", "Unsaved changes");
            card.innerHTML =
                '<div class="fmWhatsNewHead"><span class="fmTourFlower" aria-hidden="true"></span>' +
                '<div class="fmWhatsNewTitle">You didn\'t apply your changes!</div></div>' +
                '<div class="fmCloseAskText">Apply them to keep them, or discard to go back.</div>' +
                '<label class="fmCloseAskNever"><input type="checkbox"> Don\'t ask again</label>' +
                '<div class="fmCloseAskButtons">' +
                '<button type="button" class="fmTourBtn fmTourGhost" data-ask="keep">Keep editing</button>' +
                '<button type="button" class="fmTourBtn fmTourGhost" data-ask="discard">Discard</button>' +
                '<button type="button" class="fmTourBtn fmTourMain" data-ask="apply">Apply &amp; close</button></div>';

            card.addEventListener("click", (event) => {
                const choice = event.target.closest("[data-ask]")?.dataset.ask;

                if (!choice) {
                    return;
                }

                if (choice !== "keep" && card.querySelector(".fmCloseAskNever input").checked) {
                    setAsk(false);
                }

                if (choice === "keep") {
                    closeCard();
                } else if (choice === "discard") {
                    reallyClose();
                } else {
                    apply.click();
                    reallyClose();
                }
            });

            (dialog.querySelector(".themeModDialogInner") || dialog).appendChild(card);
            card.querySelector('[data-ask="apply"]').focus({ preventScroll: true });
        };

        dialog.addEventListener("click", (event) => {
            if (letThrough || !event.target.closest || event.target.closest(".closeButton") !== closeButton) {
                return;
            }

            if (!dialog.classList.contains("themeModDirty") || !askOn()) {
                return;
            }

            /* stop the real close (and its revert) until they choose */
            event.preventDefault();
            event.stopImmediatePropagation();
            openCard();
        }, true);

        /* Applying or resetting another way clears the question */
        apply.addEventListener("click", () => { if (!letThrough) closeCard(); });
        dialog.querySelector(".themeModResetButton")?.addEventListener("click", closeCard);
    }

    /* v1.6.2: "Reset all" asks first. It resets every page at once and
       saves right away, so one misclick used to wipe a whole theme. */
    function setupResetAllGuard(dialog) {
        const reset = dialog.querySelector(".themeModResetButton");

        if (!reset) {
            return;
        }

        let card = null;
        let letThrough = false;
        const closeCard = () => { card?.remove(); card = null; };

        dialog.addEventListener("click", (event) => {
            if (letThrough || !event.target.closest || event.target.closest(".themeModResetButton") !== reset) {
                return;
            }

            event.preventDefault();
            event.stopImmediatePropagation();
            closeCard();

            const simple = dialog.querySelector("#themeModSimpleMode")?.checked;

            card = document.createElement("div");
            card.className = "fmWhatsNew fmCloseAsk";
            card.setAttribute("role", "alertdialog");
            card.setAttribute("aria-label", "Reset everything");
            card.innerHTML =
                '<div class="fmWhatsNewHead"><span class="fmTourFlower" aria-hidden="true"></span>' +
                '<div class="fmWhatsNewTitle">Reset everything?</div></div>' +
                '<div class="fmCloseAskText">Every page goes back to default right away: colors, interface, popups, chat bubbles, backgrounds, animations, sounds and safety. ' +
                (simple ? "In Simple coloring only your simple colors reset. " : "") +
                'Your saved themes are kept.</div>' +
                '<div class="fmCloseAskText fmCloseAskTip">Just one part? Use the \u21BA next to a section title.</div>' +
                '<div class="fmCloseAskButtons">' +
                '<button type="button" class="fmTourBtn fmTourGhost" data-ask="keep">Cancel</button>' +
                '<button type="button" class="fmTourBtn fmTourMain" data-ask="reset">Reset all</button></div>';

            card.addEventListener("click", (e) => {
                const choice = e.target.closest("[data-ask]")?.dataset.ask;
                if (!choice) return;
                closeCard();
                if (choice === "reset") {
                    letThrough = true;
                    reset.click();
                    letThrough = false;
                }
            });

            (dialog.querySelector(".themeModDialogInner") || dialog).appendChild(card);
            card.querySelector('[data-ask="keep"]').focus({ preventScroll: true });
        }, true);

        dialog.querySelector(".closeButton")?.addEventListener("click", closeCard);
        dialog.querySelectorAll(".themeModSidebarItem").forEach((b) => b.addEventListener("click", closeCard));
    }

    function setupLiteMode(dialog) {
        const toggle = dialog.querySelector("#themeModLiteMode");

        if (!toggle) {
            return;
        }

        toggle.checked = liteMode;
        toggle.addEventListener("change", () => {
            liteMode = toggle.checked;
            localStorage.setItem(LITE_LS, String(liteMode));
            document.documentElement.classList.toggle("fmLite", liteMode);
            /* re-run the saved settings: Lite mode decides inside each */
            applySavedAnimations();
            applySavedGradients();
            applySavedBackgrounds();
        });
    }

    /* v1.6.2: the menu reopens on the page (and scroll spot) you left */
    const LAST_PLACE_LS = "flockmodMenuLastPlace";

    function setupRememberPlace(dialog) {
        const scroller = dialog.querySelector(".themeModSectionsScroll");
        let saved = null;

        try {
            saved = JSON.parse(localStorage.getItem(LAST_PLACE_LS) || "null");
        } catch (e) {
            saved = null;
        }

        const current = () => dialog.querySelector(".themeModSidebarItem.active")?.dataset.themeSection || "general";
        let timer = 0;
        const remember = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (!dialog.isConnected) return;
                localStorage.setItem(LAST_PLACE_LS, JSON.stringify({
                    section: current(),
                    scroll: scroller ? Math.round(scroller.scrollTop) : 0
                }));
            }, 250);
        };

        dialog.querySelectorAll(".themeModSidebarItem").forEach((b) => b.addEventListener("click", remember));
        scroller?.addEventListener("scroll", remember, { passive: true });

        if (saved && saved.section && saved.section !== "general") {
            const button = dialog.querySelector(`.themeModSidebarItem[data-theme-section="${saved.section}"]`);
            if (button) {
                setTimeout(() => {
                    if (!dialog.isConnected || current() !== "general") return;  /* a tour already moved on */
                    button.click();
                    requestAnimationFrame(() => { if (scroller) scroller.scrollTop = saved.scroll || 0; });
                }, 0);
            }
        } else if (saved && scroller && saved.scroll) {
            requestAnimationFrame(() => { scroller.scrollTop = saved.scroll; });
        }
    }

    /* v1.6.2: Ctrl+S (Cmd+S on Mac) applies while the mod menu is open and
       has unsaved changes. Otherwise the key is left alone. */
    window.addEventListener("keydown", (event) => {
        if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey || String(event.key).toLowerCase() !== "s") {
            return;
        }

        const menu = document.querySelector(MOD_DIALOG_SELECTOR);

        if (!menu || !menu.classList.contains("themeModDirty")) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        menu.querySelector(".themeModApplyButton")?.click();
    }, true);

    /* Pink "Unsaved changes" note beside Reset / Apply. Shows after
       you change something, hides after Apply or Reset. */
    function setupUnsavedNote(dialog) {
        const actions = dialog.querySelector(".themeModActions");
        const reset = actions && actions.querySelector(".themeModResetButton");
        const apply = actions && actions.querySelector(".themeModApplyButton");
        const scroll = dialog.querySelector(".themeModSectionsScroll");

        if (!reset || !apply || !scroll || actions.querySelector(".themeModUnsaved")) {
            return;
        }

        const note = document.createElement("span");
        note.className = "themeModUnsaved";
        note.innerHTML = '<span class="themeModUnsavedDot"></span>Unsaved changes';
        reset.before(note);

        /* Typing a theme name or searching isn't a change to apply */
        const ignored = (target) => !target || !target.closest ||
            target.closest(".themeModSearch") ||
            target.closest("#themeModAskClose, #themeModLiteMode") ||
            target.closest('[data-theme-panel="themes"]');

        const mark = (event) => {
            if (event.isTrusted && !ignored(event.target)) {
                dialog.classList.add("themeModDirty");
            }
        };

        scroll.addEventListener("input", mark, true);
        scroll.addEventListener("change", mark, true);
        scroll.addEventListener("click", (event) => {
            if (event.target.closest && event.target.closest(".themeModSubsectionReset, [data-deco-mode], .fmGradPill")) {
                dialog.classList.add("themeModDirty");
            }
        }, true);

        apply.addEventListener("click", () => dialog.classList.remove("themeModDirty"));
        reset.addEventListener("click", () => dialog.classList.remove("themeModDirty"));
    }


    /* =========================================================
       JUMP CHIPS + SEARCH (in the section title row)
       Chips are built from whatever .themeModSubsectionTitle
       elements the open panel has, so new subsections show up
       automatically. Search looks through every panel.
       ========================================================= */

    function setupJumpNavAndSearch(dialog) {
        const scroller = dialog.querySelector(".themeModSectionsScroll");
        const jumpBar = dialog.querySelector(".themeModJumpBar");
        const search = dialog.querySelector(".themeModSearch");
        const searchInput = dialog.querySelector(".themeModSearchInput");
        const searchButton = dialog.querySelector(".themeModSearchButton");
        const sectionTitle = dialog.querySelector(".themeModSectionTitle");
        const actions = dialog.querySelector(".themeModActions");
        const panels = Array.from(dialog.querySelectorAll(".themeModSectionContent"));

        const noResults = document.createElement("div");
        noResults.className = "themeModNoResults";
        noResults.textContent = "No settings match your search.";
        scroller.appendChild(noResults);

        /* ---- Index each setting once: panel + subsection + name + description ---- */
        panels.forEach((panel) => {
            let currentTitle = null;

            panel.querySelectorAll(".themeModSubsectionTitle, .themeModSetting").forEach((el) => {
                if (el.classList.contains("themeModSubsectionTitle")) {
                    currentTitle = el;
                    return;
                }

                const text = el.querySelector(".themeModSettingText");

                el._themeModTitle = currentTitle;
                el.dataset.searchText = [
                    panel.dataset.themePanel,
                    currentTitle ? currentTitle.textContent : "",
                    text ? text.textContent : ""
                ].join(" ").replace(/\s+/g, " ").toLowerCase();
            });
        });

        /* ---- Jump chips ---- */
        let chipTargets = [];
        let spyQueued = false;

        function isSearching() {
            return dialog.classList.contains("themeModSearching");
        }

        function buildChips() {
            jumpBar.innerHTML = "";
            chipTargets = [];

            if (isSearching()) {
                jumpBar.style.display = "none";
                return;
            }

            const panel = panels.find((p) => getComputedStyle(p).display !== "none");

            const titles = panel
                ? Array.from(panel.querySelectorAll(".themeModSubsectionTitle"))
                    .filter((t) => t.offsetParent !== null)
                : [];

            /* One subsection or none: nothing to jump between */
            if (titles.length < 2) {
                jumpBar.style.display = "none";
                return;
            }

            jumpBar.style.display = "";

            titles.forEach((title) => {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.className = "themeModJumpChip";
                chip.textContent = title.textContent.trim();

                chip.addEventListener("click", () => {
                    const top =
                        title.getBoundingClientRect().top -
                        scroller.getBoundingClientRect().top +
                        scroller.scrollTop - 4;

                    scroller.scrollTo({ top, behavior: "smooth" });
                });

                jumpBar.appendChild(chip);
                chipTargets.push({ chip, title });
            });

            updateActiveChip();
        }

        /* Highlights the chip of the subsection you're currently looking at */
        function updateActiveChip() {
            spyQueued = false;

            if (!chipTargets.length) {
                return;
            }

            const scrollerTop = scroller.getBoundingClientRect().top;
            const atBottom =
                scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;

            let active = chipTargets[0];

            if (atBottom) {
                active = chipTargets[chipTargets.length - 1];
            } else {
                chipTargets.forEach((target) => {
                    if (target.title.getBoundingClientRect().top - scrollerTop <= 16) {
                        active = target;
                    }
                });
            }

            chipTargets.forEach((target) => {
                target.chip.classList.toggle("active", target === active);
            });

            /* Keep the active chip visible inside the chip row */
            const chip = active.chip;

            if (chip.offsetLeft < jumpBar.scrollLeft) {
                jumpBar.scrollLeft = chip.offsetLeft - 8;
            } else if (chip.offsetLeft + chip.offsetWidth > jumpBar.scrollLeft + jumpBar.clientWidth) {
                jumpBar.scrollLeft = chip.offsetLeft + chip.offsetWidth - jumpBar.clientWidth + 8;
            }
        }

        /* Throttled to one check per frame, so scrolling stays smooth */
        scroller.addEventListener("scroll", () => {
            if (!spyQueued) {
                spyQueued = true;
                requestAnimationFrame(updateActiveChip);
            }
        }, { passive: true });

        /* Mouse wheel scrolls the chip row sideways */
        jumpBar.addEventListener("wheel", (event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                jumpBar.scrollLeft += event.deltaY;
                event.preventDefault();
            }
        }, { passive: false });

        /* ---- Search ---- */
        let savedTitle = null;
        let savedActionsDisplay = null;

        function clearSearchMarks() {
            dialog.classList.remove("themeModSearching");
            dialog.querySelectorAll(".themeModSearchHidden").forEach((el) => {
                el.classList.remove("themeModSearchHidden");
            });
            panels.forEach((panel) => panel.classList.remove("themeModSearchEmpty"));
            noResults.style.display = "none";
        }

        /* Every word you type has to start a word in the setting's text
           ("art" finds "Art style", not "start"); several words narrow it down */
        function searchMatches(text, words) {
            return words.every((w) => {
                const at = text.indexOf(w);
                if (at < 0) return false;
                const re = new RegExp("(^|[^a-z0-9])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
                return re.test(text);
            });
        }

        function hideUnmatchedBlocks(container, words, kept = []) {
            Array.from(container.children).forEach((child) => {
                if (child.matches(".themeModSetting, .themeModSubsectionTitle")) {
                    return;
                }

                const settings = child.querySelectorAll(".themeModSetting");

                if (!settings.length) {
                    const text = (child.textContent || "").replace(/\s+/g, " ").toLowerCase();
                    const show = Boolean(text.trim()) && searchMatches(text, words);
                    child.classList.toggle("themeModSearchHidden", !show);
                    if (show) kept.push(child);
                } else if (Array.from(settings).some((r) => !r.classList.contains("themeModSearchHidden"))) {
                    child.classList.remove("themeModSearchHidden");
                    hideUnmatchedBlocks(child, words, kept);
                } else {
                    child.classList.add("themeModSearchHidden");
                }
            });
            return kept;
        }

        function runSearch() {
            const query = searchInput.value.trim().toLowerCase();
            const wasSearching = isSearching();

            if (!query) {
                if (wasSearching) {
                    clearSearchMarks();
                    sectionTitle.textContent = savedTitle;
                    actions.style.display = savedActionsDisplay;
                    scroller.scrollTop = 0;
                }

                buildChips();
                return;
            }

            if (!wasSearching) {
                savedTitle = sectionTitle.textContent;
                savedActionsDisplay = actions.style.display;
            }

            dialog.classList.add("themeModSearching");

            const words = query.split(/\s+/).filter(Boolean);
            let total = 0;

            panels.forEach((panel) => {
                const rows = panel.querySelectorAll(".themeModSetting");
                const titlesWithMatches = new Set();
                let panelCount = 0;

                rows.forEach((row) => {
                    const match = searchMatches(row.dataset.searchText || "", words);
                    row.classList.toggle("themeModSearchHidden", !match);
                });

                /* Everything that isn't a setting (font lists, previews, notes,
                   whole cards) hides too unless it holds a match */
                const keptBlocks = hideUnmatchedBlocks(panel, words);

                /* Count after hiding, skipping rows hidden by simple/detailed mode */
                rows.forEach((row) => {
                    if (!row.classList.contains("themeModSearchHidden") && row.offsetParent !== null) {
                        panelCount++;
                        if (row._themeModTitle) {
                            titlesWithMatches.add(row._themeModTitle);
                        }
                    }
                });

                /* a list or note that matched by its own text keeps its section title too */
                const allTitles = Array.from(panel.querySelectorAll(".themeModSubsectionTitle"));
                keptBlocks.forEach((block) => {
                    if (block.offsetParent === null) return;
                    panelCount++;
                    const before = allTitles.filter((t) => t.compareDocumentPosition(block) & Node.DOCUMENT_POSITION_FOLLOWING);
                    if (before.length) titlesWithMatches.add(before[before.length - 1]);
                });

                panel.querySelectorAll(".themeModSubsectionTitle").forEach((title) => {
                    title.classList.toggle("themeModSearchHidden", !titlesWithMatches.has(title));
                });

                panel.classList.toggle("themeModSearchEmpty", panelCount === 0);
                total += panelCount;
            });

            noResults.style.display = total === 0 ? "block" : "none";
            sectionTitle.textContent = "Search";
            actions.style.display = "flex";
            scroller.scrollTop = 0;

            buildChips();
        }

        function openSearch() {
            search.classList.add("open");
            searchInput.focus();
        }

        function closeSearch() {
            searchInput.value = "";
            runSearch();
            search.classList.remove("open");
        }

        searchButton.addEventListener("click", () => {
            if (search.classList.contains("open") && !searchInput.value) {
                closeSearch();
            } else {
                openSearch();
            }
        });

        searchInput.addEventListener("input", runSearch);

        /* Escape arrives as a custom event from the keyboard shield
           (the real key event never reaches here, see setupKeyboardShield) */
        searchInput.addEventListener("themeModEscape", closeSearch);

        searchInput.addEventListener("blur", () => {
            if (!searchInput.value) {
                search.classList.remove("open");
            }
        });

        /* Clicking a sidebar section while searching: drop the search
           (the section's own title/actions were already set by the
           sidebar navigation, so don't restore the old ones). */
        dialog.querySelectorAll(".themeModSidebarItem").forEach((button) => {
            button.addEventListener("click", () => {
                if (isSearching() || searchInput.value) {
                    searchInput.value = "";
                    clearSearchMarks();
                    search.classList.remove("open");
                }

                dialog.dataset.section = button.dataset.themeSection;
                scroller.scrollTop = 0;
                requestAnimationFrame(buildChips);
            });
        });

        /* Simple mode shows different subsections, so rebuild */
        const simpleToggle = dialog.querySelector("#themeModSimpleMode");

        if (simpleToggle) {
            simpleToggle.addEventListener("change", () => {
                requestAnimationFrame(isSearching() ? runSearch : buildChips);
            });
        }

        buildChips();
    }

    function setupSidebarNavigation(dialog) {
        const sidebarButtons =
            dialog.querySelectorAll(
                ".themeModSidebarItem"
            );

        const sectionTitle =
            dialog.querySelector(
                ".themeModSectionTitle"
            );

        const sectionPanels =
            dialog.querySelectorAll(
                ".themeModSectionContent"
            );

        const actions =
            dialog.querySelector(
                ".themeModActions"
            );

        actions.style.display =
            "none";

        sidebarButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        sidebarButtons.forEach(
                            (item) => {
                                item.classList.remove(
                                    "active"
                                );
                            }
                        );

                        button.classList.add(
                            "active"
                        );

                        const sectionName =
                            button.dataset
                                .themeSection;

                        sectionTitle.textContent =
                            sectionName
                                .charAt(0)
                                .toUpperCase() +
                            sectionName.slice(1);

                        sectionPanels.forEach(
                            (panel) => {

                                if (
                                    panel.dataset
                                        .themePanel ===
                                    sectionName
                                ) {
                                    panel.style.display =
                                        "block";
                                } else {
                                    panel.style.display =
                                        "none";
                                }
                            }
                        );

                        if (
                            sectionName === "interface" ||
                            sectionName === "colors" ||
                            sectionName === "backgrounds" ||
                            sectionName === "animations" ||
                            sectionName === "sounds" ||
                            sectionName === "safety"
                        ) {
                            actions.style.display =
                                "flex";
                        } else {
                            actions.style.display =
                                "none";
                        }
                    }
                );
            }
        );
    }

    function toggleModMenu() {
        const existingMenu =
            document.querySelector(
                MOD_DIALOG_SELECTOR
            );

        if (existingMenu) {
            /* Close it the same way the X button does, so unsaved
               previews are reverted and the backdrop is removed too
               (an invisible leftover backdrop would block the page). */
            const closeButton = existingMenu.querySelector(".closeButton");

            if (closeButton) {
                closeButton.click();
            } else {
                existingMenu.remove();
                document.querySelectorAll(".themeModBackdrop").forEach((el) => el.remove());
            }

            return;
        }

        createModMenu();
    }

    function loadSavedCustomizations() {
        const savedState =
            localStorage.getItem(
                "flockmodCustomizationsEnabled"
            );

        if (savedState !== null) {
            customizationsEnabled =
                savedState === "true";
        }

        document.documentElement.classList.toggle(
            "flockmodCustomizationsDisabled",
            !customizationsEnabled
        );

        applySavedFont();
        applySavedFontSize();
        applySavedFontWeight();
        applySavedSpacing();
        applySavedSelectedColor();
        applySavedHoverColor();
        applySavedText1Color();
        applySavedText2Color();
        applySavedTopBarColors();
        applySavedSidebarColors();
        applySavedSimpleColorsIfActive();
        applySavedGradients();
        applySavedAnimations();
        applySavedSounds();
        applySavedDeco();
        applySavedBubbles();
        applySavedTroll();
        applySavedBackgrounds();
        applySavedThumbShape();
        applySavedCanvasDim();
        applySavedChatHighlight();
        applySavedChatNotif();
        applySavedClock();

        /* Border radius was only applied when the menu opened — now on page load too */
        if (customizationsEnabled) {
            applyRadiusPreview(localStorage.getItem("flockmodCustomUIRadius") || "5");
        }
    }

    /* =========================================================
       KEYBOARD SHIELD
       FlockMod listens for hotkeys on the whole page (T = text
       tool, etc). This catches every key event that happens
       inside the mod menu first (capture phase on window, which
       runs before any document/element listener) and stops it
       from travelling any further, so FlockMod never sees it.
       Typing itself still works: stopping an event's propagation
       doesn't block the letter from being typed.
       ========================================================= */

    /* Keys the reference window uses while its picture is focused */
    const REF_WINDOW_KEYS = ["ArrowLeft", "ArrowRight", "+", "=", "-", "0"];

    function setupKeyboardShield() {
        const shield = (event) => {
            const target = event.target;

            if (!(target instanceof Element) || !target.closest(`${MOD_DIALOG_SELECTOR}, ${REF_SELECTOR}, ${CN_SELECTOR}`)) {
                return;
            }

            /* Our own inputs still get Enter / Escape, as custom events */
            if (event.type === "keydown" && event.key === "Escape") {
                target.dispatchEvent(new CustomEvent("themeModEscape"));
            }

            if (event.type === "keydown" && event.key === "Enter" && target.matches("input")) {
                target.dispatchEvent(new CustomEvent("themeModEnter"));
            }

            /* v1.6.3: the chat cards' @ list uses arrows and Tab */
            if (event.type === "keydown" && ["ArrowUp", "ArrowDown", "Tab"].includes(event.key) &&
                target.matches("input") && target.closest(CN_SELECTOR)) {
                const keyEvent = new CustomEvent("themeModKey", { detail: { key: event.key }, cancelable: true });
                if (!target.dispatchEvent(keyEvent)) {
                    event.preventDefault();
                }
            }

            /* Reference window: it only keeps its own keys (arrows and
               zoom). Every other key (B, E, Ctrl+Z...) goes on to
               FlockMod as normal, so its hotkeys keep working. */
            if (target.closest(REF_SELECTOR) && !target.matches("input, textarea, select")) {
                const own = REF_WINDOW_KEYS.includes(event.key) &&
                    !event.ctrlKey && !event.metaKey && !event.altKey;

                if (!own) {
                    return;
                }

                if (event.type === "keydown") {
                    target.dispatchEvent(new CustomEvent("themeModRefKey", { detail: { key: event.key } }));
                }
            }

            event.stopImmediatePropagation();
        };

        ["keydown", "keypress", "keyup"].forEach((type) => {
            window.addEventListener(type, shield, true);
        });

        /* Clicking anywhere outside the mod menu / reference window
           (like the canvas) hands the keyboard back to FlockMod.
           FlockMod's canvas doesn't take focus by itself, so without
           this a focused picture kept catching keys. */
        window.addEventListener("pointerdown", (event) => {
            const active = document.activeElement;
            const inside = (el) => el instanceof Element && el.closest(`${MOD_DIALOG_SELECTOR}, ${REF_SELECTOR}, ${CN_SELECTOR}`);

            if (inside(active) && !inside(event.target)) {
                active.blur();
            }
        }, true);
    }

    function initialize() {
        setupKeyboardShield();
        setupSoundUnlock();
        setupSoundActivityTracking();
        loadSavedCustomizations();

        addModButton();

        setInterval(() => {
            /* sounds keep listening even while the tab is in the background */
            watchSoundTargets(); /* chat / Messenger boxes for sounds */
            checkMessengerBadge(); /* Messenger unread badge, for sounds */
            watchChatHighlight(); /* keyword highlights in chat / Messenger */
            watchChatNotif();     /* chat notification cards */
            watchChatBar();

            /* v1.6.2: nothing visual to update while the tab is hidden */
            if (document.hidden) {
                return;
            }

            addModButton();
            addRefButton();
            addClockButton();
            checkSeeThroughTargets();
            cnPlace();           /* chat notification cards follow the sidebar side */
            makeThumbRoom();     /* for sliders in popups opened later */
            updateDecorations(); /* ears/tails on popups opened later */
            watchBubbleChat();   /* chat bubble decorations */
        }, 500);

        /* catch up right away when you come back to the tab */
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) {
                updateDecorations();
            }
        });

        /* v1.6.3: time on FlockMod + break reminder (one light tick every 15s) */
        setupTimeTracking();

        /* v1.6.3: daily update check a little after load (for the flower dot) */
        setTimeout(backgroundUpdateCheck, 8000);

        /* Troll detection checks 4x a second (does nothing while off) */
        setInterval(trollTick, 250);
    }

    initialize();
})();