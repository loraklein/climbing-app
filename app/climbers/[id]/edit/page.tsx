'use client'

import EditClimberForm from '../../../../components/EditClimberForm'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EditClimberPage({ params }: Props) {
  const { id } = await params
  return <EditClimberForm id={id} />
}