export default class Share {
    constructor() {
        this.events()
    }
    
    events() {
        const shareButton = document.querySelector('#share-btn');
        if (shareButton) {
            if ('share' in navigator) {
                shareButton.addEventListener('click', (e) => {
                    e.preventDefault()
                    navigator.share({
                        title: _title,
                        text: _text,
                        url: window.location.href
                    })
                })
                gsap.set('.share-fallback', {
                    display: "none"
                })
            } else {
                gsap.set(shareButton, {
                    display: "none"
                })
            }
        }
        const copyLinkBtn = document.querySelector('#copy-link-btn');
        if (copyLinkBtn) {
            document.querySelector('#copy-link-btn').addEventListener("click", (e) => this.copyLinkHandler(e), false)
        }
    }
    
    copyLinkHandler(e) {
        e.preventDefault()
        let textArea = document.createElement("textarea")
        textArea.value = e.target.dataset.url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        e.target.querySelector("span").innerText = "Copied link!"
        gsap.delayedCall(1, () => {
            e.target.querySelector("span").innerText = "Copy link"
        })
    }
}