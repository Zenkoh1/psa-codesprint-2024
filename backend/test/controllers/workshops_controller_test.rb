require "test_helper"

class WorkshopsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @workshop = workshops(:one)
  end

  test "should get index" do
    get workshops_url, as: :json
    assert_response :success
  end

  test "should create workshop" do
    assert_difference("Workshop.count") do
      post workshops_url, params: { workshop: { description: @workshop.description, host: @workshop.host, title: @workshop.title, venue: @workshop.venue } }, as: :json
    end

    assert_response :created
  end

  test "should show workshop" do
    get workshop_url(@workshop), as: :json
    assert_response :success
  end

  test "should update workshop" do
    patch workshop_url(@workshop), params: { workshop: { description: @workshop.description, host: @workshop.host, title: @workshop.title, venue: @workshop.venue } }, as: :json
    assert_response :success
  end

  test "should destroy workshop" do
    assert_difference("Workshop.count", -1) do
      delete workshop_url(@workshop), as: :json
    end

    assert_response :no_content
  end
end
