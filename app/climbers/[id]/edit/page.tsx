import EditClimberForm from '../../../../components/EditClimberForm'

interface PageProps {
  params: {
    id: string
  }
}

export default function EditClimberPage({ params }: PageProps) {
  return <EditClimberForm id={params.id} />
} 