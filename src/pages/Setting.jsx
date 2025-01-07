import SideNav from '../components/SideNav'
import Nav from '../components/Nav'
import { TagInput } from 'rsuite';
import { MdUploadFile } from "react-icons/md";
import { LuFileX2 } from "react-icons/lu";




const Setting = () => {
  return (
    <>
      <Nav title={"Site/Business"} />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          {/* site setting */}
          <div className="content__body__main bg-white" id='Settings'>
            <p className='font-bold'>Site Settings</p>
            <hr />
            <div className='forms grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5 mt-3'>
              {/* First col */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p>Title</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Moto</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Email</p>
                  <input type="email" name="" id="" />
                </div>
                <div>
                  <p>All Email</p>
                  <TagInput
                    trigger={['Space', 'Comma']}
                    // placeholder="Space, Comma"
                    className='w-full'
                    menuStyle={{ width: 300 }}
                    onCreate={(value, item) => {
                      console.log(value, item);
                    }}
                  />
                </div>
                <div>
                  <p>Contact Number</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Alternative Contact Number</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>HelpLine Number</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Emergency Number</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>About Site</p>
                  <textarea rows={1}></textarea>
                </div>
                <div>
                  <p>Address</p>
                  <textarea rows={1}></textarea>
                </div>
                <div>
                  <p>Twitter Account URL</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Facebook Profile URL</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Instagram Profile URL</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>LinkedIN Profile URL</p>
                  <input type="text" />
                </div>
                <div>
                  <p>Pinterest Profile URL</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Youtube Channel URL</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>WhatsApp Chat/group URL</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Telegram Chat/group/Channel URL</p>
                  <input type="text" name="" id="" />
                </div>
              </div>
              {/* Second col */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p>Visible in search engines?</p>
                  <select name="" id="">
                    <option value="none">--Select--</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <p>Protect Content</p>
                  <select name="" id="">
                    <option value="none">--Select--</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <p>Site Logo</p>
                  <div className='file__uploader__div'>
                    <input type="file" name="" id="siteLogo" className='hidden' />
                    <label htmlFor="siteLogo" className='file__upload' title='Upload'>
                      <MdUploadFile />
                    </label>
                    <LuFileX2 className='remove__upload ' title='Remove upload' />
                  </div>
                </div>

                <div>
                  <p>Site Logo Reverse</p>
                  <div className='file__uploader__div'>
                    <input type="file" name="" id="siteLogo" className='hidden' />
                    <label htmlFor="siteLogo" className='file__upload' title='Upload'>
                      <MdUploadFile />
                    </label>
                    <LuFileX2 className='remove__upload ' title='Remove upload' />
                  </div>
                </div>

                <div>
                  <p>Site FAV Icon</p>
                  <div className='file__uploader__div'>
                    <input type="file" name="" id="siteLogo" className='hidden' />
                    <label htmlFor="siteLogo" className='file__upload' title='Upload'>
                      <MdUploadFile />
                    </label>
                    <LuFileX2 className='remove__upload ' title='Remove upload' />
                  </div>
                </div>
                <div>
                  <p>Meta Title</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Meta Keyword</p>
                  <TagInput
                    trigger={['Space', 'Comma']}
                    // placeholder="Space, Comma"
                    className='w-full'
                    menuStyle={{ width: 300 }}
                    onCreate={(value, item) => {
                      console.log(value, item);
                    }}
                  />
                </div>
                <div>
                  <p>Meta Description</p>
                  <textarea name="" id="" rows={1}></textarea>
                </div>
                <div>
                  <p>Extra Header Code</p>
                  <textarea name="" id="" rows={1}></textarea>
                </div>
                <div>
                  <p>Extra Footer Code</p>
                  <textarea name="" id="" rows={1}></textarea>
                </div>
                <div>
                  <p>Location Map Data</p>
                  <textarea name="" id="" rows={1}></textarea>
                </div>
                <div>
                  <p>Select Front Page</p>
                  <textarea name="" id="" rows={1}></textarea>
                </div>
              </div>
            </div>
          </div>
          {/* Company creation */}
          <div className="content__body__main bg-white mt-5">
            <p className='font-bold'>Company Creation</p>
            <hr />
            <div className='forms grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5'>
              {/* first col */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p>Company Name</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Company Phone</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Company Email</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>GST</p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>PAN</p>
                  <input type="text" name="" id="" />
                </div>
              </div>
              {/* Second col */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p>Bill/Invoice Logo</p>
                  <div className='file__uploader__div'>
                    <input type="file" name="" id="siteLogo" className='hidden' />
                    <label htmlFor="siteLogo" className='file__upload' title='Upload'>
                      <MdUploadFile />
                    </label>
                    <LuFileX2 className='remove__upload ' title='Remove upload' />
                  </div>
                </div>
                <div>
                  <p>Authority Signature</p>
                  <div className='file__uploader__div'>
                    <input type="file" name="" id="siteLogo" className='hidden' />
                    <label htmlFor="siteLogo" className='file__upload' title='Upload'>
                      <MdUploadFile />
                    </label>
                    <LuFileX2 className='remove__upload ' title='Remove upload' />
                  </div>
                </div>
                <div>
                  <p>Business Address</p>
                  <textarea name="" id="" rows={1}></textarea>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Setting