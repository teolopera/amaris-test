type Props = {
  text: string
}

const MessageAlert = ({text = 'test'}: Props) => {
  return (
    <div className='border-2 rounded-lg border-red-500 py-1 px-2'>
      <p className="text-red-500">{text}</p>
    </div>
  )
}

export default MessageAlert