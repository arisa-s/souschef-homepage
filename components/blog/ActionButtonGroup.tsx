'use client'
import { INSTAGRAM_SOUSCHEF_HANDLE } from '@/constants/instagram'
import { openInstagramLink } from '@/utils/instagramLink'
import { FC } from 'react'
import { GoComment, GoHeart } from 'react-icons/go'
import { PiInstagramLogoFill } from 'react-icons/pi'

export interface ActionButtonGroupProps {
  instagramPostId?: string
}

export const ActionButtonGroup: FC<ActionButtonGroupProps> = ({ instagramPostId }) => {
  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-6 divide-x border-x border-t text-2xl">
      {instagramPostId ? (
        <>
          <button
            className="col-span-1 place-items-center px-6 py-4 hover:opacity-80"
            onClick={() => openInstagramLink(`/p/${instagramPostId}`)}
          >
            <GoHeart />
          </button>
          <button
            className="col-span-1 place-items-center px-6 py-4 hover:opacity-80"
            onClick={() => openInstagramLink(`/p/${instagramPostId}`)}
          >
            <GoComment />
          </button>
        </>
      ) : (
        <div className="col-spans-2" />
      )}
      <button
        className="col-span-4 place-items-center bg-surface-component-secondary px-2 py-4 font-medium text-text-primary hover:opacity-80"
        onClick={() => openInstagramLink(`/${INSTAGRAM_SOUSCHEF_HANDLE}`)}
      >
        <div className="flex space-x-4">
          <PiInstagramLogoFill />
          <span className="text-lg">Follow us for updates!</span>
        </div>
      </button>
    </div>
  )
}

export default ActionButtonGroup
