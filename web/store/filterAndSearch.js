import { defineStore } from 'pinia'

export const useFilterAndSearchStore = defineStore({
	id: 'filtering-and-search-store',
	state: () => {
		return {
			activeFilters: {},
			searchQuery: '',
		}
	},
	actions: {
		toggleFilter(filterType, filterItem) {
			const { _id, title } = filterItem

			// Check if there are existing filters for the given filterType
  			// If not, initialize it with an empty array
			if (!this.activeFilters[filterType]) {
				this.activeFilters[filterType] = []
			}

			// Get the current list of filters for the given filterType
			const filters = this.activeFilters[filterType]

			// Check if the filterItemId exists in the current filters
			const existingFilterIndex = filters.findIndex(filter => filter._id === _id)

			if (existingFilterIndex > -1) {
				filters.splice(existingFilterIndex, 1)
			} else {
				filters.push({ _id, title })
			}

			 // If after toggling the filter, the filters array is empty, remove the filterType from activeFilters
			if (!filters.length) delete this.activeFilters[filterType]
		},
		filterData(data) {
			// If no filters are active, return all data
			//if (!Object.keys(this.activeFilters).length) return data
			if (!Object.keys(this.activeFilters).length && !this.searchQuery) return data

			// Filter the data array based on active filters
			return data.filter(item => {
				// For each _type in activeFilters, ensure the item matches all filter conditions
				const passesFilters = Object.keys(this.activeFilters).every(filterType => {
					// Get the active filter values for the current filter type
           			// Default to an empty array if no active filters for this type
					const activeFilterValues = this.activeFilters[filterType] || []

					// If there are no active filters for this type, the item automatically passes this filter
					if (!activeFilterValues.length) return true

					// Get the filter values for the current item for this filter type
            		// Default to an empty array if the item does not have filter values for this type
					const itemFilterValues = item.filterables[filterType] || []
					
					// Check if there is at least one active filter value that matches the item's filter values
    				// If at least one value matches, return true for this filter type
					// Compare based on _id
					return activeFilterValues.some(activeFilter =>
						itemFilterValues.some(itemFilter => itemFilter && activeFilter && itemFilter._id === activeFilter._id)
					)
				})

				// Check search query
				//const searchQueryLower = this.searchQuery.toLowerCase()
				//const searchMatch = item.searchables.some(text => text && text.toLowerCase().includes(searchQueryLower))

				// Return true if item passes both filter and search conditions
				return passesFilters && (this.searchQuery ? searchMatch : true)

			})
		},
		clearFilters() {
			this.activeFilters = {}
		},
	},
	getters: {
		getActiveFilters: state => state.activeFilters,
		getActiveFiltersFlattened(state) {
			return Object.entries(state.activeFilters).flatMap(([filterType, filters]) => 
				filters.map(filter => ({ ...filter, filterType }))
			)
		},
		getSearchQuery: state => state.searchQuery,
	}
})