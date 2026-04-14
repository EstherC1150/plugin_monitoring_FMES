/**
 * Utility to manage the secondary dashboard window.
 */
export class WindowManager {
    constructor(options) {
        this.popup = null;
        this.options = options;
        this.popupName = "Hyundai_Transys_FEMS_Dashboard";
        this.checkInterval = null;
    }

    open() {
        if (this.popup && !this.popup.closed) {
            this.popup.focus();
            return this.popup;
        }

        const width = 1280;
        const height = 850;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);

        this.popup = window.open("", this.popupName, 
            `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes`);

        if (!this.popup) {
            alert("팝업창이 차단되었습니다. 팝업 허용이 필요합니다.");
            return null;
        }

        // Start polling as a fallback for close detection
        this.startClosePolling();

        return this.popup;
    }

    startClosePolling() {
        if (this.checkInterval) clearInterval(this.checkInterval);
        
        this.checkInterval = setInterval(() => {
            if (this.popup && this.popup.closed) {
                clearInterval(this.checkInterval);
                if (this.options.onClose) this.options.onClose();
            }
        }, 1000); // Check every second
    }

    injectTemplate(templateHtml, styles) {
        if (!this.popup) return;

        const doc = this.popup.document;
        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>HYUNDAI TRANSYS FEMS DASHBOARD</title>
                <style>${styles}</style>
            </head>
            <body style="margin:0; padding:0; overflow:hidden; background:#F4F7FA;">
                ${templateHtml}
            </body>
            </html>
        `);
        doc.close();

        // Bind event AFTER doc.write to ensure it sticks
        this.popup.onbeforeunload = () => {
            if (this.options.onClose) this.options.onClose();
        };
    }

    close() {
        if (this.checkInterval) clearInterval(this.checkInterval);
        if (this.popup && !this.popup.closed) {
            this.popup.close();
        }
    }
}
