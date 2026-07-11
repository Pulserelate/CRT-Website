import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/logo.png" alt="" width={48} height={48} />
          <div>
            <p className="footer__name">Chimera Racing Team</p>
            <p className="footer__meta">Est. 2025 · Online esports racing</p>
          </div>
        </div>
        <p className="footer__copy">© {year} Chimera Racing Team. All rights reserved.</p>
      </div>
    </footer>
  )
}
