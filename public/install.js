let deferredInstallPrompt = null;
let installButton = null;

window.addEventListener('load', () => {
    // console.log( document.getElementById('install-button'))
    installButton = document.getElementById('install-button');
    installButton.addEventListener('click', installPWA)
    // console.log(installButton)
});

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

function installPWA() {
    // CODELAB: Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt();

    // Hide the install button, it can't be called twice.
    installButton.remove();

    // CODELAB: Log user response to prompt.
    deferredInstallPrompt.userChoice
        .then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt', choice);
            } else {
                console.log('User dismissed the A2HS prompt', choice);
            }
            deferredInstallPrompt = null;
        });

}