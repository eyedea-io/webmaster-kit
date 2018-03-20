const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

require('jest-localstorage-mock')

configure({ adapter: new Adapter() })
