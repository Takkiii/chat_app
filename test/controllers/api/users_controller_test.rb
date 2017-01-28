require 'test_helper'

class Api::UsersControllerTest < ActionController::TestCase
  test "should get search" do
    get :search
    assert_response :success
  end

end
