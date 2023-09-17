module VisitorHelper

	def visitor_login(visitor)
		cookies.permanent[:visitor_ip] = visitor.id
		self.current_visitor = visitor
	end

	def current_visitor
		@current_visitor ||= Visitor.where(ip: request.remote_ip).first_or_create!
	end

	def current_visitor=(visitor)
		@current_visitor = visitor
	end

	def visitor_logged?
		!current_visitor.nil?
	end

	def register_visit(page)
		visit = Visit.where(visitor: current_visitor, page: page).first_or_create!
		visit.update(counter: visit.counter + 1)
	end

end