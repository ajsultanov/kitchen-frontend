# Kitchenette

Search millions of recipes, find and save the ones you like to your lists. Create your own recipes in the app.

Build using functional React with Semantic UI components. State implemented with Hooks, using a Rails API back end and PostgreSQL database. Queries the Spoonacular API for recipes and metadata.

[Check out the back end code ➡︎](https://github.com/ajsultanov/kitchen-backend "Kitchenette App back end repo")

## Features
- Login
- Create/edit/delete lists
    - Name and description
- Create/edit/delete recipes that go in lists
    - Name and description
    - Cooking time and servings
    - Dynamic fields for ingredients and steps
- Move recipes between lists
- Search for recipes based on keywords
- Save recipes from search results

### Challenges
- Identifying key model relationships and setting them up correctly
- Navigating third party API to request and model the data needed
- Implementing authentication with JWT gem & local storage
- Data flow to components with async fetch requests
- more to come

### To Do
- The way I'm getting list lengths - undefined on page refresh but otherwise OK
- Pry into the CSS to make the design more exciting
- Add TESTS
- Accordion to open the list creation panel
- Search results pagination
- More fun splash page
- Add creation date attribute to recipe serializer
---
- Add VALIDATIONS on front end
- Retrieve images for recipes/allow users to upload images/display images better
- Add recipe ratings
- Option to create a new list when creating a new recipe: use modal?
- Add recipe tags
- Edit servings to change recipe amounts
- A11Y
- color code lists
- Email or social integration?

