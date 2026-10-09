const { Client } = require('@xhayper/discord-rpc');

const clientId = '123456789'; // Replace with your ID
const rpc = new Client({ clientId: clientId });

const startTimestamp = Date.now(); // Saved once so the elapsed timer stays consistent

function setActivity() {
    if (!rpc) return;

    rpc.user?.setActivity({
        details: 'Story Time',
        state: 'Writing',
        startTimestamp: startTimestamp, // Shows time elapsed since app opened
        largeImageKey: 'logo_large',    // Replace with your asset key if you have one
        largeImageText: 'Inky',
		smallImageKey: 'snek_small',
		smallImageText: 'Inky by inklestudios',
        instance: false
    }).catch((err) => console.error('Failed to set RPC activity:', err.message));
}

rpc.on('ready', () => {
    setActivity();
    // Keep status alive / update if needed
    setInterval(setActivity, 15000);
});

// Automatically attempt to log in immediately upon file execution
rpc.login().catch((err) => {
    console.error('Failed to connect to Discord RPC:', err.message);
});

// Catch errors gracefully so it never crashes your main Electron app
process.on('uncaughtException', (err) => {
    if (err.message.includes('Could not connect')) {
        console.log('Discord client is not running.');
    }
});
