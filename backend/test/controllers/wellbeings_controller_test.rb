require "test_helper"

class WellbeingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @wellbeing = wellbeings(:one)
  end

  test "should get index" do
    get wellbeings_url, as: :json
    assert_response :success
  end

  test "should create wellbeing" do
    assert_difference("Wellbeing.count") do
      post wellbeings_url, params: { wellbeing: { emotion: @wellbeing.emotion, stress: @wellbeing.stress, user_id: @wellbeing.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show wellbeing" do
    get wellbeing_url(@wellbeing), as: :json
    assert_response :success
  end

  test "should update wellbeing" do
    patch wellbeing_url(@wellbeing), params: { wellbeing: { emotion: @wellbeing.emotion, stress: @wellbeing.stress, user_id: @wellbeing.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy wellbeing" do
    assert_difference("Wellbeing.count", -1) do
      delete wellbeing_url(@wellbeing), as: :json
    end

    assert_response :no_content
  end
end
