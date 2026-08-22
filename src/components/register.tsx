import Link from "next/link";
import { STATUS, type Project, type ProjectStatus } from "@/lib/constants";

export function StatusPill({ status }: { status: ProjectStatus }) {
  const s = STATUS[status];
  return (
    <span
      className="justify-self-start whitespace-nowrap rounded-[2px] border border-current px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.12em] max-[720px]:justify-self-end"
      style={{ color: s.varName }}
    >
      {s.label}
    </span>
  );
}

export function Legend() {
  const order: ProjectStatus[] = ["live", "invite", "building", "paused"];
  return (
    <ul className="mb-6 flex flex-wrap gap-x-[18px] gap-y-2">
      {order.map((k) => (
        <li
          key={k}
          className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.06em] text-ink-faint"
        >
          <span
            aria-hidden="true"
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{ background: STATUS[k].varName }}
          />
          {STATUS[k].legend}
        </li>
      ))}
    </ul>
  );
}

function hostOf(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * One row of the register. The project name links to its case study; the
 * external site, when there is one, is a separate target so a visitor can go
 * straight to the running thing.
 */
export function ProjectRow({ project }: { project: Project }) {
  const trail = [project.formerly && `formerly ${project.formerly}`, project.note]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="grid grid-cols-[minmax(160px,1.5fr)_minmax(0,3fr)_122px] items-baseline gap-x-7 gap-y-5 py-5 transition-colors hover:bg-ground-sunk max-[720px]:grid-cols-[1fr_auto] max-[720px]:gap-x-4 max-[720px]:gap-y-1.5">
      <div>
        <h3 className="flex flex-wrap items-baseline gap-2 text-[17px] font-medium tracking-[-0.008em]">
          <Link
            href={`/portfolio/${project.slug}`}
            className="no-underline hover:text-accent"
          >
            {project.name}
          </Link>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10.5px] font-normal tracking-[0.04em] text-ink-faint no-underline hover:text-accent"
            >
              {hostOf(project.href)} ↗
            </a>
          )}
        </h3>
        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.11em] text-ink-faint">
          {project.kind}
        </p>
      </div>

      <div className="text-[14.5px] leading-[1.58] text-ink-soft max-[720px]:col-span-full">
        {project.description}
        {trail && (
          <span className="mt-1.5 block font-mono text-[10.5px] tracking-[0.04em] text-ink-faint">
            {trail}
          </span>
        )}
      </div>

      <StatusPill status={project.status} />
    </div>
  );
}

export function Register({ projects }: { projects: Project[] }) {
  return (
    <div className="ledger">
      {projects.map((p) => (
        <ProjectRow key={p.slug} project={p} />
      ))}
    </div>
  );
}
