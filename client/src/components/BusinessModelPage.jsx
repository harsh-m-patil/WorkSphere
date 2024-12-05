import {
  BriefcaseIcon,
  CashIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline';

export default function BusinessModelPage() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-10 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="worksphere-pattern"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            fill="url(#worksphere-pattern)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-600">
                Transforming Freelancing
              </p>
              <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                WorkSphere Business Model
              </h1>
              <p className="mt-6 text-xl/8 text-gray-700">
                Empowering clients and freelancers to collaborate seamlessly.
                Post work, find skilled professionals, and deliver exceptional
                results—all while we handle the logistics.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="WorkSphere App Interface"
            src="/jobs.png"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <p>
                WorkSphere bridges the gap between clients looking for talent
                and freelancers seeking opportunities. Our platform offers a
                secure and transparent process for collaboration, ensuring a
                win-win for both parties.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <BriefcaseIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Post work effortlessly.
                    </strong>{' '}
                    Clients can post tasks, specify requirements, and receive
                    applications from skilled freelancers in minutes.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Hire with confidence.
                    </strong>{' '}
                    Our vetted freelancer pool ensures you find the right person
                    for the job, no matter the industry.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CashIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Streamlined payments.
                    </strong>{' '}
                    WorkSphere charges a flat 10% service fee per project to
                    keep the platform running and ensure secure transactions.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                From creative design to software development, WorkSphere is your
                partner in finding the right talent or landing your next big
                gig. Our secure platform, backed by robust technology, makes
                freelancing simple and efficient.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                Why WorkSphere?
              </h2>
              <p className="mt-6">
                We’re more than a marketplace. WorkSphere fosters a community of
                innovation, trust, and opportunity. Whether you’re hiring or
                freelancing, our tools and resources help you succeed in today’s
                dynamic economy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
