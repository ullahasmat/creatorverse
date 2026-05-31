import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { supabase } from './client'
import Navbar from './components/Navbar'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'

function App() {
  const [creators, setCreators] = useState([])

  // Read: fetch all creators (async/await)
  const fetchCreators = async () => {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching creators:', error)
      setCreators([])
    } else {
      setCreators(data)
    }
  }

  useEffect(() => {
    fetchCreators()

    // Realtime: refetch on any change to the creators table
    const channel = supabase
      .channel('creators-table-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'creators' },
        fetchCreators
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const element = useRoutes([
    { path: '/', element: <ShowCreators data={creators} /> },
    { path: '/creator/add', element: <AddCreator onCreated={fetchCreators} /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/creator/:id/edit', element: <EditCreator /> },
  ])

  return (
    <div className="App">
      <Navbar />
      {element}
    </div>
  )
}

export default App
