import EditClimberForm from '../../../../components/EditClimberForm'

export default function EditClimberPage({
  params,
}: {
  params: { id: string }
}) {
  return <EditClimberForm id={params.id} />
} 