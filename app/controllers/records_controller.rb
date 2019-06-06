class RecordsController < ApplicationController
    before_action :authorize_request

    def index
        user = User.find params[:user_id]
        render json: { records: user.records }
    end

    def show
    record = Record.where(user_id: params[:user_id], id: params[:id])
    render json: { record: record }
    end

    def create
    user = User.find params[:user_id]

    user.records << Record.new(record_params)

    render json: { record: user.records.last }
    end

    def update
    record = Record.where(user_id: params[:user_id], id: params[:id])
    record.update record_params
    render json: { record: record }
    end

    def destroy
    record = Record.where(user_id: params[:user_id], id: params[:id])
    record.destroy(params[:id])
    render json: { record: record }
    end

    private

    def record_params
    params.permit(:name, :price, :category, :frequency, :income_expense, :date)
    end
end
