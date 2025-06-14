import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home Component (Server Component)', () => {
  it('renders main heading', () => {
    render(<Home />)
    
    expect(screen.getByRole('heading', { name: /welcome to local crag explorer/i })).toBeInTheDocument()
  })

  it('displays navigation links with correct hrefs', () => {
    render(<Home />)
    
    const exploreLink = screen.getByRole('link', { name: /explore routes/i })
    const profileLink = screen.getByRole('link', { name: /my profile/i })
    
    expect(exploreLink).toHaveAttribute('href', '/routes')
    expect(profileLink).toHaveAttribute('href', '/profile')
  })
})