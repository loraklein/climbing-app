'use client'

import { useParams } from 'next/navigation'
import EditClimberForm from '../../../../components/EditClimberForm'

export default function EditClimberPage() {
  const params = useParams()
  const id = params.id as string
  
  return <EditClimberForm id={id} />
}