const SELECTORS = {
    ANDROID: {
        ALERT_TITLE: '*//android.widget.TextView[@resource-id="android:id/alertTitle"]',
        ALERT_MESSAGE: '*//android.widget.TextView[@resource-id="android:id/message"]',
        ALERT_BUTTON: '*//android.widget.Button[@text="{BUTTON_TEXT}"]',
    },
    IOS: {
        ALERT: '-ios predicate string:type == \'XCUIElementTypeAlert\'',
    },
};

class NativeAlert {
    /**
     * Wait for the alert to exist.
     *
     * The selector for Android differs from iOS
     */
    static async waitForIsShown(isShown = true) {
        const selector = driver.isAndroid
            ? SELECTORS.ANDROID.ALERT_TITLE
            : SELECTORS.IOS.ALERT;

        return $(selector).waitForExist({
            timeout: 11000,
            reverse: !isShown,
        });
    }

    /**
     * Press a button in a cross-platform way.
     */
    static async topOnButtonWithText(selector) {
        const buttonSelector = driver.isAndroid
            ? SELECTORS.ANDROID.ALERT_BUTTON.replace(/{BUTTON_TEXT}/, selector.toUpperCase())
            : `~${selector}`;

        await $(buttonSelector).click();
    }

    /**
     * Get the alert text
     */
    static async text() {
        if (driver.isIOS) {
            return $(SELECTORS.IOS.ALERT).getText();
        }

        const title = await $(SELECTORS.ANDROID.ALERT_TITLE).getText();
        const message = await $(SELECTORS.ANDROID.ALERT_MESSAGE).getText();
        return `${title}\n${message}`;
    }
}

module.exports = NativeAlert;
