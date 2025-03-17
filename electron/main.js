const { app, BrowserWindow } = require("electron")
require("dotenv").config()

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 488,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    })

    mainWindow.loadURL(process.env.ELECTRON_SITE_URL)

    // Open DevTools in development
    if (process.env.NODE_ENV === "development") {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.on("closed", () => {
        mainWindow = null
    })
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow()
    }
})

// Handle any errors that occur
app.on("render-process-gone", (details) => {
    console.error("Render process gone:", details)
})

app.on("child-process-gone", (details) => {
    console.error("Child process gone:", details)
})
