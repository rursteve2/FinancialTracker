class User < ApplicationRecord
    has_many :records
    has_secure_password
  
    validates :username,
              presence: true,
              uniqueness: true,
              length: { maximum: 50 }
   
    validates :password,
              presence: true,
              length: { minimum: 5 },
              if: -> { new_record? || !password.nil? }
end
  
  
  
  