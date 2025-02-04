import React from 'react'
import Nav from '../../components/Nav'
import SideNav from '../../components/SideNav'
import { DatePicker, SelectPicker } from 'rsuite'
import { Editor } from '@tinymce/tinymce-react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { BiReset } from 'react-icons/bi'


// --- PAYMENT IN ---
const AddPayment = ({mode}) => {
  return (
    <>
      <Nav title={"Add Payment"} />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          <div className='content__body__main bg-white'>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0'>
              {/* First Column */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p className='mb-1'>Select Party</p>
                  <SelectPicker className='w-full'

                  />
                </div>
                <div>
                  <p className='mb-1'>Payment in Number</p>
                  <input type='text' />
                </div>
                <div>
                  <p className='mb-1'>Payment in Date</p>
                  <DatePicker
                    className='w-full'
                  />
                </div>
              </div>

              {/* Second Column */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p className='mb-1'>Payment Mode</p>
                  <SelectPicker className='w-full'
                  />
                </div>
                <div>
                  <p className='mb-1'>Account</p>
                  <SelectPicker className='w-full'
                  />
                </div>
                <div>
                  <p className='mb-1'>Amount</p>
                  <input type='text' />
                </div>
              </div>
            </div>
            <div>
              <p className='my-2'>Details/Remark</p>
              <Editor
                // onEditorChange={(v, editor) => {
                //   setPartyData({ ...partyData, details: editor.getContent() })
                // }}
                // value={partyData.details}
                apiKey='765rof3c4qgyk8u59xk0o3vvhvji0y156uwtbjgezhnbcct7'
                // onInit={(_evt, editor) => editorRef.current = editor}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>
            <div className='w-full flex justify-center gap-3 mt-3'>
              <button
                // onClick={saveParty}
                className='bg-green-500 hover:bg-green-400 text-md text-white rounded w-[70px] flex items-center justify-center gap-1 py-2'>
                <FaRegCheckCircle />
                {!mode ? "Save" : "Update"}
              </button>
              <button
                // onClick={clear}
                className='bg-blue-800 hover:bg-blue-700 text-md text-white rounded w-[60px] flex items-center justify-center gap-1 py-2'>
                <BiReset />
                Reset
              </button>
            </div>
          </div>
        </div>

      </main>

    </>
  )
}

export default AddPayment;