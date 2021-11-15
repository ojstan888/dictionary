import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './skeleton.scss'

export const Skeletons = ({ count }: { count: number }) => {
  return (
    <>
      {Array(count)
        .fill(Array(8).fill(0))
        .map((item, idx) => (
          <div className="skeleton-box" key={`${item}-${idx}`}>
            <Skeleton
              count={1}
              height={10}
              className="skeleton-box__first-line"
            />
            <div className="skeleton-box-flex">
              <div>
                <Skeleton
                  count={1}
                  height={15}
                  className="skeleton-box__second-line"
                />
              </div>
              <div>
                <Skeleton
                  count={1}
                  height={15}
                  className="skeleton-box__third-line"
                />
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
