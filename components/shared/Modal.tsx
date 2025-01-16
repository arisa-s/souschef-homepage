import { AnimatePresence, motion } from 'framer-motion'
import { MouseEventHandler, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'

export function Modal({ children }: { children: React.ReactNode }) {
  const [domReady, setDomReady] = useState(false)
  const [showModal, setShowModal] = useState(true) // Assuming you want the modal to be shown initially

  useEffect(() => {
    setDomReady(true)
  }, [])

  const handleClose = () => {
    localStorage.setItem('modalShown', 'true')
    setShowModal(false)
  }

  const handleOutsideClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      handleClose()
    }
  }

  const modalRoot = document.getElementById('modal-root')
  return domReady && showModal
    ? createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOutsideClick}
            className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()} // Prevents click inside the modal from closing it
              className="relative m-6 rounded-lg bg-surface-primary p-6"
            >
              <button className="absolute right-6 top-6 z-50 text-2xl" onClick={handleClose}>
                <FiX />
              </button>
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        modalRoot!
      )
    : null
}

export default Modal
