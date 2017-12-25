# Fast Food Facts
Featuring: Zazil, Carlos, Matt and Jack.
[Fast Food Facts](http://fastfoodfacts.herokuapp.com)<br>
Welcome to the best Nutrition Facts creating, saving, and sharing hub!<br>
With Fast Food Facts you can search for pre-populated nutritions from the USDA database or you can create your own nutrition label! if you sign up for an account you can save your nutrition labels and view or share them on social media (facebook, twitter).

# API ROUTES
GET /api/all

GET /api/{nutrition_id}

GET /api/user/{user_id}

POST /api/new
```
{
  "Name": "Test Food",
  "Serving Size": "1 Unit",
  "Calories": 200,
  "Total Fat": 14,
  "Saturated Fat": 9,
  "Trans Fat": 0,
  "Cholesterol": 55,
  "Sodium": 40,
  "Total Carbohydrate": 17,
  "Dietary Fiber": 1,
  "Sugars": 14,
  "Protein": 3,
  "Vitamin A": 10,
  "Vitamin C": 0,
  "Calcium": 10,
  "Iron": 6,
  "Category": "None"
}
```
