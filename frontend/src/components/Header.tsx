import '../public/header.css'

export function Header() {
  return (
    <header className="headerContainer">
      <div className='headerContent'>
        <a href='https://github.com/lrcilento/cuddly-system' target="_blank">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="50" height="50" />
        </a>
      </div>
    </header>
  )
}