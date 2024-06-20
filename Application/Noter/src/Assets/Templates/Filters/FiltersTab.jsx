import { useLayoutEffect, useState } from "react";
import cache from '../../../Сache/cache'
import { useNavigate } from "react-router-dom";
import './FiltersTab.css'


const FiltersTab = () => {
    const [category, setCategory] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(null);

    const pageNavigation = useNavigate();

    let pageParams = new URLSearchParams(location.search);
    // if (pageParams) pageParams = pageParams.replace(/%20/g, " ");

    let categoryId = pageParams.get("category");

    console.log(cache.ProductsLoaded);

    //Start
    useLayoutEffect(() => {
        // const newFilters = {"name":"blue", "type":"red"}
        // pageParams.set("filters", JSON.stringify(newFilters));
        // console.log(pageParams.toString());
        // const filters = pageParams.get("filters");
        // console.warn(JSON.parse(filters));
        // console.warn(JSON.parse(filters)["name"]);
        // console.warn(Object.keys(JSON.parse(filters)));

        setFilters(getFiltersFromURL());
        LoadData();
    }, []);

    //if filters updated
    useLayoutEffect(() => {
        //setting filters
        setFilters(getFiltersFromURL());
    }, [location.search]);

    return (
        <>
            {isPending && <div>Loading...</div>}
            {error && <div className="error">error: {error}</div>}
            {category && (
                <div className="filtersTab">
                    {category &&
                        category.filters.map((filter) => (
                            <Filter filter={filter} isFilterSelected={isFilterSelected} addFilter={addFilter} removeFilter={removeFilter} />

                        ))}

                    <ul className="specification">
                        <div className="sectionHeader">Processor Type</div>
                        <li className="option">
                            <a className="optionName">AMD Ryzen 7</a>
                        </li>
                        <li className="option">
                            <a className="optionName">Intel Xeon</a>
                        </li>
                        <li className="option">
                            <a className="optionName">Intel Core i5</a>
                        </li>
                    </ul>

                    <div className="specification">
                        <div className="sectionHeader">Hard Drive Sizer</div>
                        <li className="option">
                            <a className="optionName">4 TB</a>
                        </li>
                        <li className="option">
                            <a className="optionName">2 TB</a>
                        </li>
                    </div>
                </div>
            )}
        </>
    );

    function LoadData() {
        //checking if data exists in memory
        if (cache.CategoryLoaded) {
            setIsPending(false);
            setError(false);
            setCategory(cache.CategoryLoaded);
        }
        //loading data from server
        else {
            setIsPending(true);
            let loader = cache.LoadingManager.Category;
            loader.id = categoryId;
            loader.Load(OnDataLoaded);
        }
    }

    function OnDataLoaded(data, status, err) {
        if (status === "OK") {
            setCategory(data);
        }
        setError(err);
        setIsPending(false);
    }

    function isFilterSelected(name, option) {
        if (!filters) return false;

        let keys = Object.keys(filters);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key === name) {
                const options = parseOptions(filters[key]);
                if (isOptionInOptions(options, option)) return true;
            }
        }

        // for (let i = 0; i < keys.length; i++) {
        //    const key = keys[i];
        //    if (key === name) {
        //       const value = filters[key];
        //       if (value === option) return true;
        //    }
        // }
        return false;
    }

    function updateFilters(_filters) {
        if (!_filters) _filters = filters;

        pageParams.set("filters", JSON.stringify(_filters));
    }

    function addFilter(specification, optionValue) {
        //add filter to filters
        let _filters = filters;
        if (!_filters) _filters = {};
        //add option to options
        const newOptions = addOption(_filters[specification], optionValue);
        //set new options to filter
        _filters[specification] = newOptions;
        console.warn(_filters);
        // setFilters(_filters);
        //update params
        updateFilters(_filters);

        //navigate to new page
        pageParams.set("page", 1);
        pageNavigation(`/products?${pageParams.toString()}`);
    }

    function removeFilter(specification, optionValue) {
        //remove filter from filters
        if (!filters) return;
        const options = filters[specification];
        const newOptions = removeOption(options, optionValue);
        let _filters = filters;
        _filters[specification] = newOptions;
        if (filters[specification] === "") delete _filters[specification];

        setFilters(_filters);
        //update params
        updateFilters(_filters);

        //navigate to new page
        pageParams.set("page", 1);
        pageNavigation(`/products?${pageParams.toString()}`);
    }

    function addOption(options, option) {
        options = parseOptions(options);
        //if already selected, return
        if (isOptionInOptions(options, option)) return options;
        //else add option
        options.push(option);
        return options.join(",");
    }
    function removeOption(options, option) {
        options = parseOptions(options);
        //if not selected, return
        if (!isOptionInOptions(options, option)) return options;
        //else remove option
        options = options.filter((opt) => opt !== option);
        return options.join(",");
    }
    function isOptionInOptions(options, option) {
        for (let i = 0; i < options.length; i++) {
            if (options[i] === option) return true;
        }
    }

    function getFiltersFromURL() {
        let filters = pageParams.get("filters");
        if (filters) filters = JSON.parse(filters);

        if (filters && filters.length !== 0) return filters;
        return null;
    }

    function parseOptions(options) {
        if (!options) return [];
        options = options.split(",");
        return options;
    }
};

const Filter = ({ filter, isFilterSelected, removeFilter, addFilter }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <ul className="specification" key={filter.name}>
            <div className="sectionHeader" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="title">
                {filter.name}
                </div>
                <div className='dropdownIcon material-symbols-outlined'>{isExpanded ? 'stat_1' : 'stat_minus_1'}</div>
            </div>
            { isExpanded && filter.variants.map((variant) => (

                <li key={variant} className="option">
                    {isFilterSelected(filter.name, variant) && (
                        <a className="optionName" id="selected" onClick={() => removeFilter(filter.name, variant)}>
                            {variant}
                        </a>
                    )}

                    {!isFilterSelected(filter.name, variant) && (
                        <a className="optionName" id="notSelected" onClick={() => addFilter(filter.name, variant)}>
                            {variant}
                        </a>
                    )}
                </li>
            ))}
        </ul>
    )
}


export default FiltersTab