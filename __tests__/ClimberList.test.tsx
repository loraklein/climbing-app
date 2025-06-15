import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClimberList from '../components/ClimberList'

describe('ClimberList Component', () => {
  test('renders "No climbers found" when list is empty', () => {
    const mockOnClimberUpdated = jest.fn()
    
    render(<ClimberList climbers={[]} onClimberUpdated={mockOnClimberUpdated} />)
    
    expect(screen.getByText('No climbers found')).toBeInTheDocument()
  })

  test('renders climbers when data is provided', () => {
    const mockClimbers = [
      {
        id: 1,
        climber_name: 'John Doe',
        email: 'john@example.com',
        experience_level: 'intermediate',
        home_crag: 'Red Rocks',
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
    const mockOnClimberUpdated = jest.fn()
    
    render(<ClimberList climbers={mockClimbers} onClimberUpdated={mockOnClimberUpdated} />)
    
    expect(screen.getByRole('heading', { name: 'John Doe' })).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('shows edit input when edit button is clicked', async () => {
    const user = userEvent.setup()
    const mockClimbers = [
      {
        id: 1,
        climber_name: 'John Doe',
        email: 'john@example.com',
        experience_level: 'intermediate',
        home_crag: 'Red Rocks',
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
    const mockOnClimberUpdated = jest.fn()
    
    render(<ClimberList climbers={mockClimbers} onClimberUpdated={mockOnClimberUpdated} />)
    
    const editButton = screen.getByTitle('Edit home crag')
    await user.click(editButton)
    
    expect(screen.getByDisplayValue('Red Rocks')).toBeInTheDocument()
  })

  test('allows user to type in edit input field', async () => {
    const user = userEvent.setup()
    const mockClimbers = [
      {
        id: 1,
        climber_name: 'John Doe',
        email: 'john@example.com',
        experience_level: 'intermediate',
        home_crag: 'Red Rocks',
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
    const mockOnClimberUpdated = jest.fn()
    
    render(<ClimberList climbers={mockClimbers} onClimberUpdated={mockOnClimberUpdated} />)
    
    // Start editing
    const editButton = screen.getByTitle('Edit home crag')
    await user.click(editButton)
    
    // Wait for the edit input to appear
    await waitFor(() => {
      expect(screen.getByDisplayValue('Red Rocks')).toBeInTheDocument()
    })
    
    // Clear and type new text
    const input = screen.getByDisplayValue('Red Rocks')
    await user.clear(input)
    await user.type(input, 'Joshua Tree')
    
    // Check if the old text is NOT there
    expect(screen.queryByText('Home Crag: Red Rocks')).not.toBeInTheDocument()
    expect(input).toHaveValue('Joshua Tree')
  })

  it('removes edit input when cancel is clicked', async () => {
    const user = userEvent.setup()
    const mockClimbers = [
      {
        id: 1,
        climber_name: 'John Doe',
        email: 'john@example.com',
        experience_level: 'intermediate',
        home_crag: 'Red Rocks',
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
    const mockOnClimberUpdated = jest.fn()
    
    render(<ClimberList climbers={mockClimbers} onClimberUpdated={mockOnClimberUpdated} />)
    
    // Start editing
    const editButton = screen.getByTitle('Edit home crag')
    await user.click(editButton)
    
    // Confirm input appears
    const input = await screen.findByDisplayValue('Red Rocks')
    expect(input).toBeInTheDocument()
    
    // Click cancel
    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)
    
    // Check that the input is gone and original text is back
    await waitFor(() => {
      expect(screen.queryByDisplayValue('Red Rocks')).not.toBeInTheDocument()
      expect(screen.getByText('Home Crag: Red Rocks')).toBeInTheDocument()
    })
  })
})