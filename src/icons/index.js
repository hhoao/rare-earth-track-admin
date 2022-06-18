import SvgIcon from '@/components/SvgIcon'

const requireAll = requireContext => requireContext.keys().map(requireContext)

export default {
    install(app) {
        app.component('SvgIcon', SvgIcon);
        const req = require.context('./svg', false, /\.svg$/)
        requireAll(req)
    }
}
