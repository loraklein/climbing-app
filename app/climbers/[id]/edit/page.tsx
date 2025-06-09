import { use } from 'react'
import EditClimberForm from '../../../../components/EditClimberForm'

export default function EditClimberPage({ params }: { params: { id: string } }) {
  const id = use(Promise.resolve(params.id))
  return <EditClimberForm id={id} />
} 