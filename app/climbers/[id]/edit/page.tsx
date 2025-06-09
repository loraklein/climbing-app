'use client'

import EditClimberForm from '../../../../components/EditClimberForm'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function EditClimberPage({ params }: Props) {
  return <EditClimberForm id={params.id} />
} 