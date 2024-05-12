import {
  StarIcon,
  WatchIcon,
  BugIcon,
  GithubIcon,
  projectIcons,
} from '../../components/Icons';
import Link from 'next/link';
import { projects } from '../../utils/projectsData';

function Project({ project }) {
  const Icon = projectIcons[project.id];
  return (
    <div className="project">
      <aside>
        <h3>You can deploy...</h3>
        <ul>
          {projects.map((project) => {
            return (
              <li key={project.id}>
                <a href={`/project/${project.slug}`}>{project.name}</a>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = projects.map((project) => ({
    params: { path: project.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = projects.find((proj) => proj.slug === params.path);
  const res = await fetch(`https://api.github.com/repos/${project.path}`);
  const data = await res.json();
  project.open_issues = data.open_issues;
  project.subscribers_count = data.subscribers_count;
  project.stargazers_count = data.stargazers_count;
  return { props: { project } };
}

export default Project;
