import React, { Component } from "react";
import Gallery from 'react-grid-gallery';


// First, let's define the user list that we'll be using

var images = [
    {
        id: 130,
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        isSelected: false,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)",
    },
    {
        id: 131,
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: false,
        tags: [{value: "Nature", title: "Nature"}, {value: "CloseUp", title: "CloseUp"}],
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        id: 132,
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        isSelected: false,
        tags: [{value: "Colour", title: "Colour"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)",
    }
];



// Now we set up the list - keep in mind we'll want an input for filtering!
class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterQuery: '',
            activeUser: false
        };
        
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onUserClick = this.onUserClick.bind(this);

    }

    onFilterChange(e) {
        console.log(this);
        console.log(e);
        // Update the state with the filter string
        this.setState({ filterQuery: e.target.value });
    }

    onUserClick(userInfo) {
        // Update the state with the selected user,
        //  and call the provided function to bubble
        this.setState({ activeUser: userInfo.id });
        if ( this.props.onUserSelect ) {
            this.props.onUserSelect(userInfo);
        }
    }
    
    render() {
        // Time to render!
        var self = this;
        var list = this.props.images;

        console.log(this.props)

        // Convert the filter string to lowercase
        var q = this.state.filterQuery.trim().toLowerCase();
        var listCls = ['user-list'];
        
        if ( q.length > 0 ) {
            // Filter the users, based on the input string
            list = list.filter(function(user) {
                for (const tag of user.tags) {
                    if (tag.value.toLowerCase().match(q)) { return true }
                }
                return false
            });
        }
        
        // Populate the list with React components
        list.forEach(function(user) {
            var isActive = false;
            if ( self.state.activeUser && self.state.activeUser == user.id ) {
                isActive = true;
            }
            
        });
        
        // Add an additional class if we have a selected user
        if ( this.state.activeUser ) {
            listCls.push('has-active-user');
        }
        listCls = listCls.join(' ');
        
        return (
            <div className="user-list-wrap">
                <input type="text" value={this.state.filterQuery} onChange={this.onFilterChange} placeholder="Filter ..." />
                <Gallery images={list} />
            </div>
        );
    }
}


class Stuff extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedUser: false };
        
        this.onUserSelect = this.onUserSelect.bind(this);
    }

    onUserSelect(userInfo) {
        // Pass this function to have our state updated
        console.log({ userInfo });
    }
    
    render() {
        return (
            <div>
            <h2>Image Gallery</h2>

            <UserList images={images} onUserSelect={this.onUserSelect} />
            </div>
        );
    }
}

export default Stuff;