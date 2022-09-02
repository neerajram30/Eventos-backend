import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon,UserIcon } from '@heroicons/react/solid'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../../../features/auth/authSlice'
import {useNavigate, Link} from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const {user} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const clickHandle = ()=>{
      dispatch(logout());
      dispatch(reset())
      navigate('/')
    }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-blue shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-white focus:outline-none">
          <UserIcon className='w-6 pr-1' aria-hidden="true"/>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"

      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1 text-sm font-[500]"> 
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
          {/* </div> */}
          {/* <div className="py-1"> */}
            {user ?
              (<Menu.Item>
                {({ active }) => (
                  <button
                  onClick={clickHandle}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                   logout
                  </button>
                )}

              </Menu.Item>)
              :
              (<Menu.Item>
                {({ active }) => (
                  <Link
                    to="/login"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    login
                  </Link>
                )}

              </Menu.Item>
              )}
          </div> 
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
