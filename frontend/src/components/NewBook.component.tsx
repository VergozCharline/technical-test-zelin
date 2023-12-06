import React from 'react'

type Props = {
  setOpenNewBook: (value: boolean) => void;
}

export default function NewBook({ setOpenNewBook }:Props) {
  return (
    <section className='h-screen flex justify-center items-center backdrop-blur-md'>
      <div className="w-[80%] h-[80vh] mx-auto shadow-xl rounded-xl">
        <h2 className='px-10 py-3 mt-10 rounded-xl shadow-md text-center text-2xl border-2 border-hoverPurple w-max mx-auto'>Ajouter un livre</h2>
        <button className='absolute right-48 top-40 border rounded-full px-3 py-1 hover:text-white hover:bg-hoverPurple' onClick={() => setOpenNewBook(false)}>X</button>
      </div>
    </section>
  )
}
