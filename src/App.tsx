import i18next from "src/i18n/i18next.config"

function App() {

  return (
    <div>
      <p className="text-main-color bg-main-background">App {i18next.t('hello')}</p>
    </div>
  )
}

export default App
