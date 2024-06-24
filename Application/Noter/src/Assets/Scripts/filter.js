class Filter {
    specName;
    specOption;

    constructor(specName, specOption) {
        this.specName = specName;
        this.specOption = specOption;
    }

    static extractFilters(string) {
        if (!string || string === "") return [];
        //let str = "?other_text specifications.Back-Facing Camera=46 MP&specifications.Back-Facing Camera=46 MP";

        // .specifications{any}={any}& ---all matches
        let matches = string.match(/specifications\.[^=]*=[^&]*/g);

        let filters = [];

        if (matches) {
            matches.forEach((match) => {
                let parts = match.split("=");
                let specName = parts[0].replace("specifications.", "");
                let specOption = parts[1];

                console.log(`specName: ${specName}, specOption: ${specOption}`);

                filters.push(new Filter(specName, specOption));
            });
        }
        return filters;
    }

    addFilter(filter, string) {
        // if(string !== null && string !== "") string += "&";
        string += `specifications.${filter.specName}=${filter.specOption}`;
        return string;
    }

    removeFilter(filter, string) {
        let regex = new RegExp(`specifications.${filter.specName}=${filter.specOption}&?`);
        string = string.replace(regex, "");

        return string;
    }

    containsFilter(filter, string) {
        let regex = new RegExp(`specifications.${filter.specName}=${filter.specOption}`);
        return regex.test(string);
    }
}

export default Filter;

//Filter => create (specName, specOption)
//
//extract filters
// string => filters[]
//
//string contains filter
// if fiter in filters[]
//
//add filter
// if not added => add
//
//remove filter
// if contains => remove
//
//
//
//
//
