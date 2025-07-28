'use client'
import { useNote } from "./Context/NoteContext";
import Note from "./Component/Note";
import InputAdd from "./Component/InputAdd";
import Filters from "./Component/Filters";

const sampleTasks = [
  { _id: "1", title: "Buy groceries", description: "Milk, Bread, Cheese", priority: "High", complete: false },
  { _id: "2", title: "Finish project", description: "Finalize report for client", priority: "Medium", complete: true },
  { _id: "3", title: "Workout", description: "30-minute run + stretching", priority: "Low", complete: false },
  { _id: "4", title: "Read a book", description: "Continue reading 'Atomic Habits'", priority: "Low", complete: false },
  { _id: "5", title: "Team meeting", description: "Weekly sync with dev team", priority: "High", complete: true },
];

export default function Home() {
  const { notes } = useNote()
  const tasks = notes.length ? notes : sampleTasks
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const [filters, setFilters] = useState(
    {
      search: '',
      status: 'all',
      priority: 'all'
    })
  const filterTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' ||
      (filters.status === 'complete' && task.complete) ||
      (filters.status === 'incomplete' && !task.complete);
    const matchesPriority =
      filters.priority === 'all' ||
      task.priority === filters.priority;

      return matchesSearch && matchesStatus && matchesPriority
  })
  .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  return (
    <main className="min-h-screen bg-[#1E1E2F] text-[#F1F1F5] px-6 py-12 sm:py-20 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10 tracking-tight">
          📋 Task Manager
        </h1>
        <Filters onFilterChange={setFilters} />
        <div className="mb-12">
          <InputAdd />
        </div>

        {filterTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterTasks.map((note) => (
              <Note key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-[#A0A0B2]">No Tasks Found</p>
        )}
      </div>
    </main>
  );
}


{/* <div key={note._id} className="bg-[#2C2C3A] p-6 rounded-2xl shadow-lg hover:scale-[1.01] transition-all duration-300 ease-in-out">
                <h2 className="text-2xl font-semibold mb-2">{note.title}</h2>
                <p className="text-[#A0A0B2] mb-4">{note.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full 
                    ${note.priority === 'High' && 'bg-[#FF6B6B]/20 text-[#FF6B6B]'}
                    ${note.priority === 'Medium' && 'bg-[#FFA94D]/20 text-[#FFA94D]'}
                    ${note.priority === 'Low' && 'bg-[#63E6BE]/20 text-[#63E6BE]'}`}>
                    {note.priority}
                  </span>
                  {note.complete ? (
                    <span className="text-green-400 font-medium text-sm">✅ Completed</span>
                  ) : (
                    <span className="text-yellow-400 font-medium text-sm">🕒 In Progress</span>
                  )}
                </div>
              </div> */}