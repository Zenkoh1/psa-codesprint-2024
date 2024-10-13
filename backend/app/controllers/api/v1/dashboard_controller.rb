class Api::V1::DashboardController < ApplicationController
  def get_workshops_per_month
    workshops = Workshop.where(:start_time => Time.now.beginning_of_year..Time.now.end_of_year)
    workshops_per_month = workshops.group_by { |workshop| workshop.start_time.strftime("%B") }
    workshops_per_month_count = workshops_per_month.map { |month, workshops| {"month": month, "count": workshops.count} }
    workshops_per_month_count_sorted = workshops_per_month_count.sort_by { |workshop| Date::MONTHNAMES.index(workshop[:month]) }
    render json: workshops_per_month_count_sorted
  end

  def get_user_emotions_count
    users = User.all
    user_emotions = users.map { |user| user.wellbeing&.emotion }.compact
    user_emotions_count = user_emotions.group_by { |emotion| emotion }
    user_emotions_count = user_emotions_count.map { |emotion, count| {"emotion": emotion, "count": count.count} }
    render json: user_emotions_count
  end

  def get_user_stress_count
    users = User.all
    user_stress = users.map { |user| user.wellbeing&.stress }.compact
    user_stress_count = user_stress.group_by { |stress| stress }
    user_stress_count = user_stress_count.map { |stress, count| {"stress": stress, "count": count.count} }
    render json: user_stress_count
  end

  def get_monthly_average_workshop_registrations
    workshops = Workshop.where(:start_time => Time.now.beginning_of_year..Time.now.end_of_year)
    workshops_per_month = workshops.group_by { |workshop| workshop.start_time.strftime("%B") }
    workshops_per_month_count = workshops_per_month.map { |month, workshops| {"month": month, "count": workshops.count} }
    workshops_registrations_per_month = workshops_per_month.map { |month, workshops| {"month": month, "count": workshops.map { |workshop| workshop.users.count }.sum} }
    average_workshops_registrations_per_month = workshops_registrations_per_month.map { |workshop| {"month": workshop[:month], "average": workshop[:count].to_f / workshops_per_month_count.find { |workshop_count| workshop_count[:month] == workshop[:month] }[:count]} }
    average_workshops_registrations_per_month_sorted = average_workshops_registrations_per_month.sort_by { |workshop| Date::MONTHNAMES.index(workshop[:month]) }
    average_workshops_registrations_per_month_sorted_filtered = 
      average_workshops_registrations_per_month_sorted.select { |workshop| workshop[:average] > 0 }
    render json: average_workshops_registrations_per_month_sorted_filtered
  end

  def get_user_count
    user_count = User.count
    render json: {count: user_count}
  end

  def get_forum_post_count
    forum_post_count = Question.count
    render json: {count: forum_post_count}
  end

end