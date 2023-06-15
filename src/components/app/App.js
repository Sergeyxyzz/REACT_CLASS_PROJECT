import { Component } from 'react'

import AppFilter from '../app-filter/appFilter'
import AppInfo from '../app-info/appInfo'
import EmployersAddForm from '../employers-add-form/employersAddForm'
import EmployersList from '../employers-list/employersList'
import SearchPanel from '../search-panel/searchPanel'

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {name: 'Катя', salary: 500, increase: false, id: 1},
        {name: 'Вася', salary: 800, increase: false, id: 2},
        {name: 'Морда', salary: 3000, increase: false, id: 3},
      ],
      term: '',
      filter: 'all',
    }
    this.maxId = 4
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem]
      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise)
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000)
      default:
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  render() {
    const {data, term, filter} = this.state
    const employees = this.state.data.length
    const increased = this.state.data.filter(item => item.increase).length
    const visibleData = this.filterPost(this.searchEmp(data, term), filter)

    return (<div className="app">
    <AppInfo employees={employees} increased={increased}/>

    <div className="search-panel">
      <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
      <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
    </div>

    <EmployersList data={visibleData} onDelete={this.deleteItem} onToggleProp={this.onToggleProp} />
    <EmployersAddForm onAdd={this.addItem}/>
  </div>)
  }

}

export default App