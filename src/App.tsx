import { useJob, useJobsList } from "./hooks/jobs.hook"

const App = () => {
  const {data: jobs} = useJobsList({q: "", location: "", page: 1, pageSize: 10, remote: false});
  const {data: job} = useJob("1");
  console.log(jobs);
  console.log(job);
  return (
    <div>App</div>
  )
}

export default App