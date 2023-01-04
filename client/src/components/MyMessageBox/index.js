import { createApp, watch } from 'vue'
import MyMessageBoxComponent from './MyMessageBox'

export default function MyMessageBox(options) {
    const messageApp = createApp(MyMessageBoxComponent, options)
    showMessageBox(messageApp, {
        cancel: options.cancelClick,
        confirm: options.confirmClick
    })
}
function showMessageBox(app, { cancel, confirm }) {
    const frg = document.createDocumentFragment()
    const vm = app.mount(frg)
    document.body.appendChild(frg)
    vm.setVisible(true)

    watch(vm.state, () => {
        const { type, visible } = vm.state
        if (!visible) {
            switch (type) {
                case 'CANCEL':
                    typeof cancel === 'function' && cancel()
                    break;
                case 'CONFIRM':
                    typeof confirm === 'function' && confirm()
                    break;
            }
        }

        hideMessageBox(app)
    })
}

function hideMessageBox(app) {
    app.unmount()
}

