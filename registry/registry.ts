import { mount } from 'svelte'
import './app.css'
import RegistryApp from './RegistryApp.svelte'

const app = mount(RegistryApp, {
    target: document.getElementById('registry')!,
})

export default app
