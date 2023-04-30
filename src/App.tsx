import i18next from "src/i18n/i18next.config"

function App() {

  return (
    <div>
      App {i18next.t('hello')}
    </div>
  )
}

export default App
