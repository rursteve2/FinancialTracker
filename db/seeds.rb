# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Record.destroy_all


user1 = User.create(username: "hello", password: "helloworld", password_confirmation: "helloworld", first_name: "steve", last_name: "jobs")
user2 = User.create(username: "goodbye", password: "helloworld", password_confirmation: "helloworld", first_name: "steve", last_name: "wozniak")
user3 = User.create(username: "morning", password: "helloworld", password_confirmation: "helloworld", first_name: "ronald", last_name: "wayne")


rec1 = Record.create(
    name: "bagel",
     price: 2.25,
      category: "food",
      date: 1556683200000,
       frequency: "Daily",
       income_expense: "expense")
rec2 = Record.create(name: "online shopping", price: 184.12, category: "misc", date: 1556683200000, frequency: "Daily", income_expense: "expense")
rec3 = Record.create(name: "gift", price: 12.25, category: "misc", date: 1556856000000, frequency: "Once", income_expense: "expense")
rec4 = Record.create(name: "vacation", price: 1032.15, category: "travel", date: 1557028800000, frequency: "Once", income_expense: "expense")
rec5 = Record.create(name: "dinner", price: 22.25, category: "food", date: 1556942400000, frequency: "Daily", income_expense: "expense")
rec6 = Record.create(name: "income", price: 294, category: "job", date: 1556856000000, frequency: "Monthly", income_expense: "income")
rec7 = Record.create(name: "income", price: 192.25, category: "other", date: 1556942400000, frequency: "Once", income_expense: "income")

user1.records.push(rec1, rec2, rec3)
user2.records.push(rec4, rec5)
user3.records.push(rec6, rec7)
